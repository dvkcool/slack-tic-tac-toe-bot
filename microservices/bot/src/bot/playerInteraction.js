const rx = require('rx');
const MessageHelpers = require('./messageHelpers');
const Board = require('../tictac/board');

class PlayerInteraction {

    static pollPotentialPlayers(messages, channel, scheduler = rx.Scheduler.timeout, timeout = 25, maxPlayers = 2) {
        let formatMessage = t => `Who wants to play? Respond with 'yes' in this channel in the next ${t} seconds.`;
        let {timeExpired} = PlayerInteraction.postMessageWithTimeout(channel, formatMessage, scheduler, timeout);
        let newPlayers = messages.where(e => MessageHelpers.containsWord(e.text, 'yes'))
            .map(e => e.user)
            .take(maxPlayers)
            .publish();
        newPlayers.connect();
        timeExpired.connect();
        return newPlayers.takeUntil(timeExpired); // when the time expires
    }

    static getCellFromPlayer(messages, channel, player, board) {
        channel.send(`${player.name}, please choose a cell number ${player.symbol}\n${board.toString()}`);
        let message = messages
            .where(e => {

                if (e.text === 'quit') {
                    return true;
                }

		let cell = parseInt(e.text)-1;
                 if (e.user !== player.id || isNaN(e.text)) {
                    return false;
                }else if (!Board.validCell(cell)) {
                    channel.send(`${player.name}, please choose a valid cell index as 3x<row>+<col> e.g. 3x0+1=1.`);
                    return false;
                }else if (board.isCellFull(cell)) {
                    channel.send(`${player.name}, the cell is full, please choose another.`);
                    return false;
                }
                return true;
            })
            .map(e => {
                if (e.text === 'quit') {
                    return e.text;
                } else {
                    return parseInt(e.text) - 1;
                }
            })
            .take(1)
            .publish();
        message.connect();
        return message;
    }

    static postMessageWithTimeout(channel, formatMessage, scheduler, timeout) {
        let timeoutMessage = channel.send(formatMessage(timeout));
        let timeExpired = rx.Observable.timer(0, 1000, scheduler)
            .take(timeout + 1)
            .do((x) => timeoutMessage.updateMessage(formatMessage(`${timeout - x}`)))
            .publishLast();
        return {timeExpired: timeExpired, message: timeoutMessage};
    }
}

module.exports = PlayerInteraction;
