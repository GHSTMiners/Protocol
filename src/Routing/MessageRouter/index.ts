import * as Messages from "../../../lib/Messages"

export default class MessageRouter {
    constructor() {
        this.routes = new Map<string, Array<(message : any) => void>>()
    }

    public addRoute(routeType : Function, callback : (message : any) =>void) : void {
        //Check if route already exists
        let routes : Array<(messsage : any) => void> | undefined = this.routes.get(routeType.name);
        if(routes) {
            routes.push(callback)
        } else {
            let routes : Array<(messsage : any) => void> = new Array<(messsage : any) => void>(callback)
            this.routes.set(routeType.name, routes)
        }
    }

    public getRoutes(routeType : Function): Array<(messsage : any) => void> | undefined {
        return this.routes.get(routeType.name);
    }

    public processMessage(message : Messages.Message) {
        let routes : Array<(messsage : any) => void> | undefined = this.routes.get(message.name);
        if(routes) {
            routes.forEach(callback => {
                callback(JSON.parse(message.data))
            })
        }
    }

    public processRawMessage(name : string, data : string) {
        this.processMessage(Messages.Message.create({name: name, data: data}));
    }

    private routes: Map<string, Array<(message : any) => void>>
}