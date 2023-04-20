import fastifyPlugin from "fastify-plugin";
import { FastifyInstance } from 'fastify';

const myPlugin = (fastify: FastifyInstance, options: any, next: any) => {
    // Plugin implementation
    // fastify.decorate('myPluginMethod', function () {
    //     console.log('My plugin method')
    // })

    // Call the next callback to signal the plugin is ready
    next()
}
export default fastifyPlugin(myPlugin)