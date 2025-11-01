import { Console, MissionUtils } from "@woowacourse/mission-utils";

class App {
  async run() {
    const cost = await this.getPurchase();
    this.costException(cost);
    const iterate = this.getLottoCount(cost);
    Console.print(`\n${iterate + "개를 구매했습니다."}`);
    Console.print(this.getLotto(iterate));
    const prizeNum = this.getPrizeNum();
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
    let result = "";
    for (let i = 0; i < iter; i++) {
      result += `${
        "[" + MissionUtils.Random.pickUniqueNumbersInRange(1, 45, 6) + "]\n"
      }`;
    }
    return result;
  }

  async getPrizeNum() {
    const prizeNum = await Console.readLineAsync(
      "\n당첨 번호를 입력해 주세요.\n"
    );
    return prizeNum;
  }
}

export default App;
