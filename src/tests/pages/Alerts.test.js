import React from "react";
import { shallow } from "enzyme";
import { Alerts } from "../../pages/Alerts";

describe("Test in <Alerts />", () => {
  const wrapper = shallow(<Alerts />);
  const h1 = wrapper.find("h1");
  test("should display the component correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
  test('should show an h1 with the text "Alerts"', () => {
    expect(h1.text().trim()).toBe("Alerts");
  });
  test("should show an h1 with class text-white", () => {
    expect(h1.prop("className")).toContain("text-white");
  });
});
