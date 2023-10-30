import Car from '../model/Car.js';
import CarGame from '../model/CarGame.js';
import GameResult from '../model/GameResult.js';
import InputView from '../view/InputView.js';
import OutputView from '../view/OutputView.js';
import { Console } from '@woowacourse/mission-utils';

class CarGameController {
  #gameResult;
  #carLog;

  async start() {
    const carNames = await InputView.readCarNames();
    const carMap = new Car().convertStringToMap(carNames);
    this.playGameStage(carMap);
  }

  async playGameStage(carMap) {
    const attempts = await InputView.readAttempts();
    const carPosition = new CarGame().checkPosition(carMap, attempts);
    this.checkResultStage(carPosition, Number(attempts));
  }

  checkResultStage(carPosition, attempts) {
    OutputView.printResultMessage();
    this.#gameResult = new GameResult();

    for (let i = 0; i < attempts; i++) {
      this.#carLog = this.#gameResult.getForwardResult(carPosition);
      OutputView.printGameProcess(this.#carLog);
      Console.print('\n');
    }
    this.determineWinnerStage(this.#carLog);
  }

  determineWinnerStage(carLog) {
    const winners = this.#gameResult.getWinner(carLog);
    OutputView.printWinner(winners);
  }
}

export default CarGameController;
