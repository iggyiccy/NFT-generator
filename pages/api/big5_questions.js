import { Component } from "react";
import { Router } from "../routes";

const {
  getItems,
  getInfo,
  getChoices,
  getQuestions,
} = require("@alheimsins/b5-johnson-120-ipip-neo-pi-r");

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
      position: 0,
      inventory: this.props.inventory,
      itemsPerPage: 4,
      results: [],
      answers: [],
      items: [],
      lang: "en",
      now: Date.now(),
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleClearAnswers = this.handleClearAnswers.bind(this);
  }

  componentDidMount() {
    const itemsPerPage = window.innerWidth < 600 ? 1 : 4;
    if (getProgress()) {
      const data = restoreData();
      this.setState({ ...data, itemsPerPage, restore: true });
      console.log("Your state is restored from LocalStorage");

      if (lang !== "en") {
        setItem("lang", lang);
        Router.pushRoute(`/test`);
      }
    } else {
      const { items } = getItems(
        this.state.position,
        itemsPerPage,
        this.state.inventory
      ).current();
      this.setState({ items, itemsPerPage });
    }
  }

  handleClearAnswers() {
    clearItems();
    window.location.reload(true);
  }

  async handleChange({ target }) {
    const { answers, items, inventory, itemsPerPage, previous, position } =
      this.state;
    const { domain, facet } = inventory.find((q) => q.id === target.name);
    answers[target.name] = { score: parseInt(target.value), domain, facet };
    const progress = Math.round(
      (Object.keys(answers).length / inventory.length) * 100
    );
    const next =
      itemsPerPage === 1 && progress !== 100
        ? false
        : items.filter((item) => !answers[item.id]).length === 0;
    this.setState({ answers, progress, next });
    populateData({ answers, progress, next, previous, position, items });
    if (itemsPerPage === 1 && progress !== 100) {
      await sleep(700);
      await this.handleSubmit();
    }
  }

  handleBack() {
    window.scrollTo(0, 0);
    const { previous, items, position } = getItems(
      this.state.position,
      this.state.itemsPerPage,
      this.state.inventory
    ).back();
    this.setState({ items, position, next: true, previous });
  }

  async handleSubmit() {
    window.scrollTo(0, 0);
    const { items, finished, position } = getItems(
      this.state.position,
      this.state.itemsPerPage,
      this.state.inventory
    ).next();
    if (finished) {
      clearItems();
      const answers = this.state.answers;
      const choices = Object.keys(answers).reduce((prev, current) => {
        const choice = answers[current];
        prev.push({
          domain: choice.domain,
          facet: choice.facet,
          score: choice.score,
        });
        return prev;
      }, []);
      const result = {
        ...getInfo(),
        answers: choices,
        timeElapsed: Math.round((Date.now() - this.state.now) / 1000),
        dateStamp: Date.now(),
      };
      const { data } = await httpInstance.post("/api/save", result);
      setItem("result", data._id);
      Router.pushRoute("showResult", { id: data._id });
    } else {
      const next =
        items.filter((item) => !this.state.answers[item.id]).length === 0;
      this.setState({ items, position, next, previous: true, restore: false });
      populateData({
        progress: this.state.progress,
        next,
        previous: true,
        answers: this.state.answers,
        position,
        items,
      });
    }
  }

  render() {
    const { items, progress, answers, next, previous, now, restore } =
      this.state;
    const done = progress === 100 && next;
    const { handleChange, handleSubmit, handleBack } = this;
    return (
      <div style={{ textAlign: "left" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ textAlign: "right", fontSize: "12px" }}>
            <Timer start={now} />
          </div>
        </div>
        <ProgressBar progress={progress} />
        {restore && (
          <p
            onClick={this.handleClearAnswers}
            style={{ color: "#FF0080", marginTop: "10px", cursor: "pointer" }}
          >
            <FaInfoCircle /> Your state is restored from LocalStorage. Click
            here to start over again.
          </p>
        )}
        {items.map((item) => (
          <div key={item.id} className="item">
            <div className="question">{item.text}</div>
            <RadioGroup
              name={item.id}
              onChange={handleChange}
              checked={answers[item.id] && answers[item.id].score}
            >
              {item.choices.map((choice) => (
                <Radio
                  key={item.id + choice.score}
                  value={choice.score}
                  color="5"
                  text={choice.text}
                  style={{ display: "block" }}
                />
              ))}
            </RadioGroup>
          </div>
        ))}
        <div className="navigation">
          <div style={{ marginRight: "10px" }}>
            <Button
              type="submit"
              value="Back"
              onClick={handleBack}
              disabled={!previous}
            />
          </div>
          <div>
            <Button
              type="submit"
              value={done ? "See results" : "Next"}
              onClick={handleSubmit}
              background={done ? "#FF0080" : "black"}
              border={done ? "1px solid #FF0080" : "1px solid black"}
              disabled={!next}
            />
          </div>
        </div>
        <style jsx>
          {`
            .item {
              margin-top: 30px;
            }
            .navigation {
              margin-top: 30px;
              display: inline-flex;
            }
            .question {
              font-size: 28px;
              margin-bottom: 2px;
            }
            .inverted-text {
              -moz-transform: scale(-1, 1);
              -webkit-transform: scale(-1, 1);
              -o-transform: scale(-1, 1);
              -ms-transform: scale(-1, 1);
              transform: scale(-1, 1);
            }
          `}
        </style>
      </div>
    );
  }
}
