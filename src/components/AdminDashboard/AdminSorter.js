import React, { Component, Fragment } from "react";
import { Message, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";

import * as actions from "actions";

class AdminSorter extends Component {
  state = { students: [], companyChoices: {}, tentativeAdmits: {}, consoleContents: [] };

  async componentDidMount() {
    await this.props.fetchStudents();
    // set students in state, adding a resolved key/value pair
    const students = this.props.students.map((student) => {
      return { ...student, resolved: false };
    });
    this.setState({ students: students });

    // set companyChoices and tentativeAdmits in state
    const companyChoices = {};
    const tentativeAdmits = {};
    this.props.auth.companyChoices.forEach((company) => {
      companyChoices[company.name] = company;
      tentativeAdmits[company.name] = [];
    });
    this.setState({ companyChoices: companyChoices, tentativeAdmits: tentativeAdmits });
  }

  startSort = async () => {
    console.log(this.state);
    const students = [...this.state.students];
    const companyChoices = { ...this.state.companyChoices };
    const tentativeAdmits = { ...this.state.tentativeAdmits };
    let round = 1;

    while (students.some((student) => student.resolved === false)) {
      console.log(this.logger)
      await this.logger("round", `Round ${round}`);
      console.log(`Round ${round}`);
      // loop through students
      for (let i = 0; i < students.length; i++) {
        const currentStudent = students[i].name;
        this.logger("header", `Current Student: ${currentStudent}`);
        console.log(`CURRENT STUDENT: ${currentStudent}`);
        // skip students who have been resolved tentatively or definitively
        if (students[i].resolved === true || students[i].resolved === "tentative") {
          continue;
        } else if (students[i].choices.length === 0) {
          students[i].choices = "Eliminated";
          students[i].resolved = true;

          // remove instances of the student from companyChoices;
          for (let company in companyChoices) {
            const filtered = companyChoices[company].choices.filter((choice) =>
              choice !== currentStudent ? true : false
            );
            companyChoices[company].choices = filtered;
          }

          this.logger(
            "warning",
            `${currentStudent} has no (remaining) choices and has been eliminated from contention.`
          );
          console.log(`${currentStudent} has no (remaining) choices and has been eliminated from contention.`);
          continue;
        }

        // if student has choices, loop through them
        for (let j = 0; j < students[i].choices.length; j++) {
          let currentStudentChoice = students[i]["choices"][j];
          // skip companies chosen by students which do not appear in the companies list for whatever reason
          if (!companyChoices[currentStudentChoice]) {
            // mark student as eliminated from this choice
            students[i]["choices"][j] = "eliminated";
            this.logger("message", `Choice number ${j + 1} for ${currentStudent} is ${currentStudentChoice}`);
            this.logger("warning", `This company is not on the company list.`);
            this.logger("message", `Moving to next choice`);
            console.log(`Choice number ${j + 1} for ${currentStudent} is ${currentStudentChoice}`);
            console.log(`This company is not on the company list.`);
            console.log("Moving on to next choice");
            continue;
          }

          const currentCompanyChoices = companyChoices[currentStudentChoice].choices;
          this.logger("message", `Choice number ${j + 1} for ${currentStudent} is ${currentStudentChoice}`);
          console.log(`Choice number ${j + 1} for ${currentStudent} is ${currentStudentChoice}`);

          if (currentCompanyChoices.includes(currentStudent) === false) {
            this.logger("warning", `${currentStudent} eliminated by ${currentStudentChoice} (not on company list)`);
            console.log(`${currentStudent} eliminated by ${currentStudentChoice} (not on company list)`);
            students[i]["choices"][j] = "eliminated";
            continue;
          }
          // if the student is in the company list
          const numberAccepted = companyChoices[currentStudentChoice].numberAccepted;
          this.logger("message", `${currentStudentChoice} accepts ${numberAccepted} student(s)`);
          console.log(`${currentStudentChoice} accepts ${numberAccepted} student(s)`);

          const currentNumberOfAdmits = tentativeAdmits[currentStudentChoice].length;
          this.logger("message", `${currentStudentChoice} has currently accepted ${currentNumberOfAdmits} student(s)`);
          console.log(`${currentStudentChoice} has currently accepted ${currentNumberOfAdmits} student(s)`);

          // push the current student name into the tentativeAdmits provisionally
          tentativeAdmits[currentStudentChoice].push(currentStudent);
          // sort the array in rank order
          tentativeAdmits[currentStudentChoice].sort(function(a, b) {
            return (
              companyChoices[currentStudentChoice]["choices"].indexOf(a) -
              companyChoices[currentStudentChoice]["choices"].indexOf(b)
            );
          });

          // if adding the student does not surpass the quota
          if (tentativeAdmits[currentStudentChoice].length <= numberAccepted) {
            this.logger("success", `${currentStudent} shortlisted by ${currentStudentChoice}`);
            console.log(`${currentStudent} shortlisted by ${currentStudentChoice}`)
            // mark student as tentatively resolved
            students[i].resolved = "tentative";
            // move on to next student
            break;
          }

          // if company's quota is already filled
          this.logger("message", `${currentStudentChoice}'s quota has already been filled`);
          this.logger("message", "Checking student ranking");
          console.log(`${currentStudentChoice}'s quota has already been filled`);
          console.log("Checking student ranking");

          // if last person in array is the current student, student is rejected
          const lastPerson = tentativeAdmits[currentStudentChoice].length - 1;

          if (tentativeAdmits[currentStudentChoice][lastPerson] === currentStudent) {
            this.logger("warning", `${currentStudent} is ranked lower than current admits.`);
            this.logger("warning", `${currentStudent} is eliminated from contention.`);
            console.log(`${currentStudent} is ranked lower than current admits and has been eliminated from contention.`)

            // mark the choice as eliminated
            students[i]["choices"][j] = "eliminated";
            // remove the student from tentative admits array
            tentativeAdmits[currentStudentChoice].pop();
            // move on to next choice
            continue;
          }

          // if last person in the array is not the current student
          this.logger("success", `${currentStudent} shortlisted by ${currentStudentChoice}</span>`);
          console.log(`${currentStudent} shortlisted by ${currentStudentChoice}</span>`);

          // mark current student resolved status as tentative
          students[i]["resolved"] = "tentative";

          // remove the displaced student's highest choice from students array
          const index = students.findIndex(
            (student) => student.name === tentativeAdmits[currentStudentChoice][lastPerson]
          );
          if (Array.isArray(students[index]["choices"])) {
            students[index]["choices"].shift();
          }
          // switch displaced student's resolved status back to false
          students[index]["resolved"] = false;
          // remove displaced person from tentative admits array
          tentativeAdmits[currentStudentChoice].pop();
          // move on to next student
          break;
        }
      }
      // after each round, filter out instances of 'eliminated' from the students' choices
      students.forEach((student) => {
        if (Array.isArray(student.choices)) {
          // ignore students who do not have a choices array
          const filtered = student.choices.filter((choice) => {
            return choice !== "eliminated";
          });
          student["choices"] = filtered;
        }
      });

      console.log(`Student choices after this round:`);
      console.log(students);
      console.log(`Tentative Admits after this round:`);
      console.log(tentativeAdmits);

      round++;
    }
    // after all students are resolved, mark all students as resolved (as opposed to tentative)
    students.forEach(student => {
      student.resolved = true;
    });

    this.logger("round", "Sorting completed");
    console.log("sorting completed")
    console.log(tentativeAdmits)
    console.log(students);
    console.log("state after sorting", this.state)
  };

  logger = (type, text) => {
    const item = { type: type, text: text };
    const newContents = [...this.state.consoleContents];
    newContents.push(item);
    // for some reason the logger is erasing previous values
    this.setState({ consoleContents: newContents });
  }

  renderError() {
    const { authMessage, t } = this.props;
    if (authMessage) {
      return (
        <Message
          style={{ marginBottom: "15px", width: "80%" }}
          error
          header={t("studentForms.formErrors.errorHeader")}
          content={authMessage}
        />
      );
    }
  }

  renderConsole() {
    return this.state.consoleContents.map((item, index) => {
      return <li key={index} className={`console-${item.type}`}>{item.text}</li>;
    });
  }

  render() {
    const { t } = this.props;
    return (
      <Fragment>
        <h2>{t("adminDashboard.sorter.header")}</h2>
        {this.renderError()}
        <div className="actions-bar">
          <Button basic size="small" onClick={this.startSort}>
            Start Sort
          </Button>
          <Button basic size="small">
            Save Output
          </Button>
        </div>
        <div className="sorter-container">
          <div className="sorter-box">
            <h3>Console</h3>
            <div id="console" className="sorter-display">
              <ul>
                {this.renderConsole()}
              </ul>
            </div>
          </div>
          <div className="sorter-box">
            <h3>Output</h3>
            <div id="output" className="sorter-display">
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    authMessage: state.authMessage,
    students: state.students
  };
};
const wrapped = connect(
  mapStateToProps,
  actions
)(AdminSorter);
export default withTranslation()(wrapped);
