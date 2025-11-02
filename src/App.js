import { Console, MissionUtils } from "@woowacourse/mission-utils";
import Lotto from "./Lotto.js";

class App {
  async run() {
    const cost = await this.getPurchase();
    this.costException(cost);
    const iterate = this.getLottoCount(cost);
    Console.print(`\n${iterate + "개를 구매했습니다."}`);
    const lottoSet = this.getLotto(iterate);
    Console.print(lottoSet);
    const prizeNum = await this.getPrizeNum();
    const bonusNum = await this.getBonusNum();
    this.validateBonusNum(bonusNum, prizeNum);
    const result = this.checkWin(lottoSet, prizeNum, bonusNum);
    this.printWin(result);
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
    return new Set([...prizeNumSet].map(Number));
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
    return Number(bonusNum);
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

  checkWin(lottoSet, prizeNum, bonusNum) {
    const result = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    const winningSet = new Set(prizeNum);
    for (const lotto of lottoSet) {
      const matchCnt = lotto.filter((n) => winningSet.has(n)).length;
      const hasBonus = lotto.includes(bonusNum);
      if (matchCnt === 6) result[1]++;
      else if (matchCnt === 5 && hasBonus) result[2]++;
      else if (matchCnt === 5) result[3]++;
      else if (matchCnt === 4) result[4]++;
      else if (matchCnt === 3) result[5]++;
    }
    return result;
  }

  getPrizeMoney() {
    return {
      1: 2000000000,
      2: 30000000,
      3: 1500000,
      4: 50000,
      5: 5000,
    };
  }

  printWin(result) {
    const prizeMoney = this.getPrizeMoney();
    Console.print("\n당첨 통계\n---\n");
    Console.print(`3개 일치 (${prizeMoney[5]}원) - ${result[5]}개`);
    Console.print(`4개 일치 (${prizeMoney[4]}원) - ${result[4]}개`);
    Console.print(`5개 일치 (${prizeMoney[3]}원) - ${result[3]}개`);
    Console.print(
      `5개 일치, 보너스 볼 일치 (${prizeMoney[2]}원) - ${result[2]}개`
    );
    Console.print(`6개 일치 (${prizeMoney[1]}원) - ${result[1]}개`);
  }
}

export default App;
