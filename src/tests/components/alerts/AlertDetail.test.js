import React from "react";
import { shallow } from "enzyme";
import { AlertDetail } from "../../../components/alerts/AlertDetail";

describe("Test in <AlertDetail />", () => {
  const data = {
    _index: "wazuh-alerts-4.x-sample-security",
    _type: "_doc",
    _id: "23Gmr3QB4YtWQbLv1inX",
    _score: 1,

    _source: {
      "@sampledata": true,
      timestamp: "2020-09-14T18:30:45.569+0000",

      rule: {
        firedtimes: 1,
        mail: false,
        level: 5,

        pci_dss: ["11.5"],

        hipaa: ["164.312.c.1", "164.312.c.2"],
        description: "File added to the system.",

        groups: ["ossec", "syscheck"],
        id: "554",

        nist_800_53: ["SI.7"],

        gpg13: ["4.11"],

        gdpr: ["II_5.1.f"],
      },

      agent: {
        id: "004",
        name: "Ubuntu",
        ip: "47.204.15.21",
      },

      manager: {
        name: "wazuh-master",
      },

      cluster: {
        name: "wazuh",
      },
      id: "1580123327.49031",

      predecoder: {},

      decoder: {},

      data: {},
      location: "",

      syscheck: {
        event: "added",
        path: "/run/utmp",
        uname_after: "NETWORK Service",
        gname_after: "root",
        mtime_after: "2020-09-14T19:40:09.863Z",
        size_after: 18,
        uid_after: "S-1-5-18",
        gid_after: "190",
        perm_after: "rw-r--r--",
        inode_after: 41722,
      },
    },
  };

  const wrapper = shallow(<AlertDetail alert={data} />);

  test("should display the component correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should show an h1 with the text "<b>Id:</b>23Gmr3QB4YtWQbLv1inX" ', () => {
    const h1 = wrapper.find("h1");
    expect(h1.text()).toBe("Alert detail");
  });
});
