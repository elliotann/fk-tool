const { config, start } = require("fk-server")
const serverConfig = require("./config")
{{each services}}
const {{$value.name}} = require("./{{$value.relaPath}}"){{/each}}

const services = { {{each services}}
    {{$value.name}},{{/each}}
}

config(serverConfig({ services }))

start()