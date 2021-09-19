# DATA PARSING

## Install package

Run `npm install`

## Script doc

Usage: Data Analyse [options] [command]

Script to find prestations: 
 List of filters :[getByUuid] [getByType] [getBySiteId] [getByTpId] [getBySupplier] [getBySupplierId] [getByBeforDate] [getByAfterDate]

Options:
  -h, --help                     display help for command

Commands:
  find [filter_name] [argument]
  help [command]                 display help for command

#### find command
Usage: Data Analyse find [options] [filter_name] [argument]

Arguments:
  filter_name  type of filtre
  argument     argument of filter

Options:
  -h, --help   display help for command

## Run script examples

Run `node index.js find getByType rail`

Run `node index.js find getByType car`

Run `node index.js find getByAfterDate 2019-10-31`

Run `node index.js find getBySupplier pao`