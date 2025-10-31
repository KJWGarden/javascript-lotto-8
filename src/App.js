import { Console } from "@woowacourse/mission-utils";

class App {
  async run() {
    const cost = await this.getPurchase();
    this.costException(cost);
  }

  async getPurchase() {
    const inputcost = await Console.readLineAsync("구입금액을 입력해 주세요");
    return inputcost;
  }

  costException(cost) {
    if (cost % 1000 != 0) {
      throw new Error("[ERROR] 구입금액은 1000원 단위로만 가능합니다.");
    }
  }
}

export default App;
