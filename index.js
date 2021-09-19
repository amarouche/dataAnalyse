const cli = require('commander')
const dataParsing = require('./parsing.js')

const init =  new dataParsing()

cli.description(
  "Script to find prestations: \n "+
  "List of filters :[getByUuid] [getByType] [getBySiteId] [getByTpId] [getBySupplier] [getBySupplierId]");
cli.name("Data Analyse");
cli.command("find")
  .argument("[filter_name]", "type of filtre")
  .argument("[argument]", "argument of filter")
  .action(async (filter_name,argument) => {
    return await init.readdir(filter_name,argument)
  });

cli.parse(process.argv);