import React, { useState, useEffect } from "react";
import MultiSelect from "react-multi-select-component";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import * as COMMON_APIS from "../../../api/common";

const ProfileStep3Form = (props) => {
  const { onSubmit, errorMsg, interests, regionData, userData } = props;

  console.log("props====>", props);
  let selectedInterest = [];
  for (let interestData of interests) {
    selectedInterest.push({
      label: interestData,
      value: interestData,
    });
  }

  const [selected, setSelected] = useState(selectedInterest);
  const [interestError, setInterestError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [address, setAddress] = useState(regionData);
  const [lat, setLat] = useState(userData.latitude ? userData.latitude : "");
  const [long, setLong] = useState(
    userData.longitude ? userData.longitude : ""
  );
  const [country, setCountry] = useState(
    userData.country ? userData.country : ""
  );
  const [region, setRegion] = useState(regionData);
  const [tagsList, setTagList] = useState([]);

  // const options = [
  //   { label: "Bike riding", value: "Bike riding" },
  //   { label: "Reading", value: "Reading" },
  //   { label: "Coding", value: "Coding" },
  // ];

  useEffect(() => {
    (async () => {
      const tagsList = await COMMON_APIS.getTags(
        JSON.parse(localStorage.getItem("userData")).event
      );
      console.log("tagsList======>", tagsList);

      let finalTagList = [];
      for (let tag of tagsList) {
        finalTagList.push({ label: tag, value: tag });
      }
      setTagList(finalTagList);
    })();

    console.log("----------------------------------------", lat, long, country);
  }, []);

  const handleInterest = (interests) => {
    setSelected(interests);
    if (interests.length == 0) {
      setInterestError(true);
    } else {
      setInterestError(false);
    }
  };
  const handleChange = (address) => {
    console.log("aashish--- address>", address);
    setAddress(address);
  };

  const handleSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => {
        console.log("resullt--->", results);

        setAddress(results[0].address_components[0].long_name);
        setRegion(results[0].address_components[0].long_name);
        setAddressError(false);
        setCountry(
          results[0].address_components[
            results[0].address_components.length - 1
          ].long_name
        );

        return getLatLng(results[0]);
      })
      .then(({ lat, lng }) => {
        console.log("lat lng", lat, lng);
        setLat(lat);
        setLong(lng);
      })
      .catch((error) => console.error("Error", error));
  };

  const handleSubmit = () => {
    if (region == "") {
      setAddressError(true);
    }
    if (selected.length == 0) {
      setInterestError(true);
    }
    if (region != "" && selected.length != 0) {
      let interests = [];

      for (let interest of selected) {
        interests.push(interest.value);
      }

      let data = {
        region: region,
        country: country,
        latitude: lat,
        longitude: long,
        interests: interests,
      };
      onSubmit(data);
    }
  };

  return (
    <>
      <div className="welcomeProHead">
        <h2>
          Welcome {props.userData.firstName} {props.userData.lastName}!
        </h2>
        {/* <p>
          Please begin by filling in your attendee details and uploading a
          profile picture
        </p> */}
        <ul className="welcomeTab">
          <li className="active">
            <a href="#">{1}</a>
          </li>
          <li className="active">
            <a href="#">{2}</a>
          </li>
        </ul>
      </div>
      <div className="welcomeProForm">
        <div className="welcomeProInner">
          <div className="welcome3Inner">
            <div className="welcome3Text">
              <h3>Set up your customized networking experience</h3>
              <p>
                Visit the suggested for me tab within summit to be connected
                with like-minded attendees or view suggested sessions
                and experience based on your interests.
              </p>
            </div>
            <div className="welcome3Filed">
              <div className="formField">
                {/* <GooglePlacesAutocomplete
                onSelect={handleChange}
              /> */}

                <div className="form-group">
                  <PlacesAutocomplete
                    value={address}
                    onChange={handleChange}
                    onSelect={handleSelect}
                  >
                    {({
                      getInputProps,
                      suggestions,
                      getSuggestionItemProps,
                      loading,
                    }) => (
                      <div>
                        <input
                          {...getInputProps({
                            placeholder: "Select your region",
                            className: "form-control",
                          })}
                        />
                        <div className="autocomplete-dropdown-container">
                          {loading && <div>Loading...</div>}
                          {suggestions.map((suggestion) => {
                            const className = suggestion.active
                              ? "suggestion-item--active"
                              : "suggestion-item";
                            // inline style for demonstration purpose
                            const style = suggestion.active
                              ? {
                                  backgroundColor: "#fafafa",
                                  cursor: "pointer",
                                }
                              : {
                                  backgroundColor: "#ffffff",
                                  cursor: "pointer",
                                };
                            return (
                              <div
                                {...getSuggestionItemProps(suggestion, {
                                  className,
                                  style,
                                })}
                              >
                                <span>{suggestion.description}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </PlacesAutocomplete>
                  {addressError == true && (
                    <div className="signupError_msg">
                      This field is required
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <label>Please select the all topics that interest you.</label>
                  {tagsList.length > 0 && (
                    <MultiSelect
                      options={tagsList} // Options to display in the dropdown
                      value={selected}
                      onChange={handleInterest}
                    />
                  )}
                  {interestError == true && (
                    <div className="signupError_msg">
                      This field is required
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          {errorMsg != "" && <div className="signupError_msg">{errorMsg}</div>}
        </div>
        <div className="profileSaveButton">
          <button
            type="button"
            className="saveContNew"
            onClick={() => handleSubmit()}
          >
            Save Profile
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfileStep3Form;
