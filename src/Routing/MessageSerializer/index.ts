import * as Messages from '../../../lib/Messages';

export default class MessageSerializer {
  public static serialize(data: object): Messages.Message {
    let message: Messages.Message = new Messages.Message();
    message.name = data.constructor.name;
    message.data = JSON.stringify(data);
    return message;
  }
}
