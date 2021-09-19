const fs = require('fs');

module.exports = class ParsingData{

  async readdir(filter_name,arg){
    try {
      const files = await fs.promises.readdir('./DATA');
      let data = [];
      for (const file of files){
        let rawdata = await fs.promises.readFile('./DATA/'+file, 'UTF-8');
        console.info("Parsing file: " + file)
        let json_file = JSON.parse(rawdata); 
        let res = this.switchFilters(filter_name,arg, json_file)
        if(res.length !== 0 ){
          data.push(res)
        }
      }
      if(data.length === 0)
        throw 'No data was found !';
      let res = {
        count:data.length,
        [filter_name]:arg,
        prestations: data
      }
      fs.writeFile('./res/'+filter_name+'_'+Date.now()+'.json', JSON.stringify(res,null,4), function(err) {
        if(err) {
          return console.log(err);
        }
      });
      console.info(res)
      return res
    }
    catch (err) {
      console.error(err);
    }
  }

  switchFilters(filter_name,arg, data){
    const filterArray = {
      getByUuid:'uuid',
      getByType:'type',
      getBySiteId:'site_id',
      getByTpId:'tp_id',
      getBySupplier:'supplier',
      getBySupplierId:'supplier_id',
      getByBeforDate:'creation_date',
      getByAfterDate:'creation_date'
    }

    if(Object.keys(filterArray).indexOf(filter_name) == -1)
      throw 'First parameter is not a filter!';
    
    for(let index of Object.keys(filterArray)) {
      if(index === filter_name){
        if(data[filterArray[index]] === arg)
          return data
        else if(filterArray[index] === 'creation_date'){
          if(!arg.match(/^\d{4}-\d{2}-\d{2}$/))
            throw 'Invalid date format, Date should be like "YYYY-MM-DD"'
          if((filter_name === 'getByBeforDate' && new Date(data['creation_date']).getTime() <= new Date(arg).getTime())
              || (filter_name === 'getByAfterDate' && new Date(data['creation_date']).getTime() >= new Date(arg).getTime())){
              return data
          }
        }
      }
    }
    return []
  }
}