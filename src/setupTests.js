import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

console.log("Enzyme configured")
Enzyme.configure({ adapter: new Adapter() });
