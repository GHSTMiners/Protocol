import MessageRouter from "../Routing/MessageRouter"
import MessageSerializer  from "../Routing/MessageSerializer"
import * as Messages from "../../lib/Messages"
import exp from "constants";
test('Create route', ()=>{
    //Create router and check that is it initialized without routes
    let router : MessageRouter = new MessageRouter();
    expect(router.getRoutes(Messages.ChangeDirection)).toBeUndefined()
    //Add a route and check that the route was created
    router.addRoute(Messages.ChangeDirection, function (message : Messages.ChangeDirection) {})
    //Add more routes and check that they where added too
    router.addRoute(Messages.ChangeDirection, function (message : Messages.ChangeDirection) {})
    expect(router.getRoutes(Messages.ChangeDirection)?.length).toEqual(2)
})

test('Test route', done => {
    let router : MessageRouter = new MessageRouter();
    router.addRoute(Messages.ChangeDirection, function (message : Messages.ChangeDirection) {
        expect(message.x).toBe(1)
        expect(message.y).toBe(2)
        done()
    })
    //Create ChangeDirectionmessage and Serialize
    let changeDirection : Messages.ChangeDirection = new Messages.ChangeDirection({x : 1, y : 2})
    router.processMessage(MessageSerializer.serialize(changeDirection))
})