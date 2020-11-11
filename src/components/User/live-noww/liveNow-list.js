import React from "react";
import LiveNowEvent from "./liveNow-event";
import AgendaEvent from "../agenda/agendaEvent";

const LiveNowList = (props) => {
  return (
    <div className="liveNowSections">
      <LiveNowEvent
        serialNo="01"
        title="Saving energy in homes with unified approach to data and AI"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida."
        time="02:30PM - 04:30PM US/Pacific | 02:30PM - 04:30PM PDT"
        agendaId="test_agenda_id"
        tags={["Deep Learning", "Intermidate"]}
        isFavourite={undefined}
      />

      <LiveNowEvent
        serialNo="01"
        title="Saving energy in homes with unified approach to data and AI"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida."
        time="02:30PM - 04:30PM US/Pacific | 02:30PM - 04:30PM PDT"
        agendaId="test_agenda_id"
        tags={["Deep Learning", "Intermidate"]}
      />
    </div>
  );
};

export default LiveNowList;
