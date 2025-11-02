import { Console, MissionUtils } from "@woowacourse/mission-utils";
import Lotto from "./Lotto.js";

class App {
  async run() {
    const cost = await this.getPurchase();
    this.costException(cost);
    const iterate = this.getLottoCount(cost);
    Console.print(`\n${iterate + "개를 구매했습니다."}`);
    Console.print(this.getLotto(iterate));
    const prizeNum = await this.getPrizeNum();
    const bonusNum = await this.getBonusNum();
    this.validateBonusNum(bonusNum, prizeNum);
  }

  async getPurchase() {
    const inputcost = await Console.readLineAsync(
      "구입금액을 입력해 주세요.\n"
    );
    return inputcost;
  }

  costException(cost) {
    if (cost % 1000 != 0) {
      throw new Error("[ERROR] 구입금액은 1000원 단위로만 가능합니다.");
    }
  }

  getLottoCount(cost) {
    const count = cost / 1000;
    return count;
  }

  getLotto(iter) {
    let result = [];
    for (let i = 0; i < iter; i++) {
      const numbers = MissionUtils.Random.pickUniqueNumbersInRange(1, 45, 6);
      numbers.sort((a, b) => a - b);

      const lotto = new Lotto(numbers);
      result.push(lotto.getNumbers());
    }
    return result;
  }

  async getPrizeNum() {
    const prizeNum = await Console.readLineAsync(
      "\n당첨 번호를 입력해 주세요.\n"
    );
    const prizeNumSet = this.validatePrizeNum(prizeNum);
    return prizeNumSet;
  }

  validatePrizeNum(prizeNum) {
    if (!prizeNum || prizeNum.trim() === "") {
      throw new Error("[ERROR] 당첨번호를 입력해야 합니다.");
    }
    if (!prizeNum.includes(",") && prizeNum.trim().includes(" ")) {
      throw new Error("[ERROR] 당첨번호는 쉼표(,)로만 구분해야 합니다.");
    }
    if (/[^0-9,]/.test(prizeNum)) {
      throw new Error(
        "[ERROR] 당첨번호는 숫자와 쉼표(,)로만 입력되어야 합니다."
      );
    }

    const numbers = prizeNum.split(",").map((number) => number.trim());
    if (numbers.length != 6) {
      throw new Error("[ERROR] 당첨번호는 6개를 입력해야 합니다.");
    }

    const numSet = new Set();
    for (const number of numbers) {
      if (number == "") {
        throw new Error("[ERROR] 당첨번호는 비어 있을 수 없습니다.");
      }

      if (number < 1 || number > 45) {
        throw new Error("[ERROR] 당첨번호는 1과 45사이의 숫자여야 합니다.");
      }

      if (numSet.has(number)) {
        throw new Error("[ERROR] 당첨번호는 중복될 수 없습니다.");
      }

      numSet.add(number);
    }
    return numSet;
  }

  async getBonusNum() {
    const bonusNum = await Console.readLineAsync(
      "\n보너스 번호를 입력해 주세요.\n"
    );
    return bonusNum;
  }

  validateBonusNum(bonusNum, numSet) {
    if (!bonusNum || bonusNum.trim() === "") {
      throw new Error("[ERROR] 보너스 번호를 입력해야 합니다.");
    }
    if (/[^0-9]/.test(bonusNum)) {
      throw new Error("[ERROR] 보너스 번호는 숫자만 입력해야 합니다.");
    }
    if (bonusNum < 1 || bonusNum > 45) {
      throw new Error("[ERROR] 보너스 번호는 1과 45 사이의 숫자여야 합니다.");
    }
    if (numSet.has(bonusNum)) {
      throw new Error("[ERROR] 보너스 번호는 당첨번호와 중복될 수 없습니다.");
    }
  }
}

export default App;
