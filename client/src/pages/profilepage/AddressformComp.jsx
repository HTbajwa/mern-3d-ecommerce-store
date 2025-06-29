import { useState, useEffect } from "react";
import { Field, Formik, Form } from "formik";
import { Country, State, City } from "country-state-city";
import Select from "react-select";

import { address } from "../../Validation/address";
import { usePostCreateAddressMutation } from "../../store/api/addressapi";

const AddressformComp = ({ addaddress, closefun, reload }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [postaddress] = usePostCreateAddressMutation();

  useEffect(() => {
    const allCountries = Country.getAllCountries().map((country) => ({
      label: country.name,
      value: country.isoCode,
      ...country,
    }));
    setCountries(allCountries);
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      const countryStates = State.getStatesOfCountry(selectedCountry.value).map((state) => ({
        label: state.name,
        value: state.isoCode,
        ...state,
      }));
      setStates(countryStates);
      setSelectedState(null);
      setCities([]);
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState && selectedCountry) {
      const stateCities = City.getCitiesOfState(
        selectedCountry.value,
        selectedState.value
      ).map((city) => ({
        label: city.name,
        value: city.name,
      }));
      setCities(stateCities);
    }
  }, [selectedState, selectedCountry]);

  const createrecord = async (data) => {
    const response = await postaddress(data);
    if (response.data) {
      closefun();
      reload();
    }
  };

  return (
    <Formik
      initialValues={{
        first_name: "",
        last_name: "",
        mobile: "",
        email: "",
        address1: "",
        address2: "",
        country: "",
        state: "",
        city: "",
        pincode: "",
      }}
      validationSchema={address}
      onSubmit={(values) => {
        createrecord(values);
      }}
    >
      {({ values, errors, touched, setFieldValue }) => (
        <Form autoComplete="off">
          {addaddress && (
            <div className="container addressbox">
              <div className="row">
                <div className="col-12 d-flex justify-content-between">
                  <h6 className="mb-3 mt-3" style={{ color: "#059fe2" }}>
                    Add a new address
                  </h6>
                  <h6
                    className="mb-3 mt-3"
                    onClick={closefun}
                    style={{
                      color: "#059fe2",
                      fontSize: "19px",
                      cursor: "pointer",
                    }}
                  >
                    x
                  </h6>
                </div>

                {/* Input Fields */}
                {[
                  { name: "first_name", label: "First Name" },
                  { name: "last_name", label: "Last Name" },
                  { name: "email", label: "Email ID", type: "email" },
                  { name: "mobile", label: "Mobile No.", type: "number" },
                  { name: "address1", label: "Address 1" },
                  { name: "address2", label: "Address 2" },
                  { name: "pincode", label: "Pincode", type: "text" },
                ].map(({ name, label, type = "text" }) => (
                  <div className="col-lg-6" key={name}>
                    <div className="form-group">
                      <label
                        style={{ fontWeight: "500", fontSize: "12px" }}
                        htmlFor={name}
                      >
                        {label}
                      </label>
                      <Field
                        name={name}
                        type={type}
                        className="form-control"
                        style={{ fontSize: "12px" }}
                        placeholder={label}
                      />
                      {errors[name] && touched[name] && (
                        <p style={{ color: "red" }}>{errors[name]}</p>
                      )}
                    </div>
                  </div>
                ))}

                {/* Country */}
                <div className="col-lg-6">
                  <div className="form-group">
                    <label style={{ fontWeight: "500", fontSize: "12px" }}>
                      Country
                    </label>
                    <Select
                      options={countries}
                      value={selectedCountry}
                      onChange={(option) => {
                        setSelectedCountry(option);
                        setFieldValue("country", option.name);
                      }}
                      placeholder="Select Country"
                      styles={{ input: (base) => ({ ...base, fontSize: "12px" }) }}
                    />
                    {errors.country && touched.country && (
                      <p style={{ color: "red" }}>{errors.country}</p>
                    )}
                  </div>
                </div>

                {/* State */}
                <div className="col-lg-6">
                  <div className="form-group">
                    <label style={{ fontWeight: "500", fontSize: "12px" }}>
                      State
                    </label>
                    <Select
                      options={states}
                      value={selectedState}
                      onChange={(option) => {
                        setSelectedState(option);
                        setFieldValue("state", option.name);
                      }}
                      placeholder="Select State"
                      isDisabled={!selectedCountry}
                      styles={{ input: (base) => ({ ...base, fontSize: "12px" }) }}
                    />
                    {errors.state && touched.state && (
                      <p style={{ color: "red" }}>{errors.state}</p>
                    )}
                  </div>
                </div>

                {/* City */}
                <div className="col-lg-6">
                  <div className="form-group">
                    <label style={{ fontWeight: "500", fontSize: "12px" }}>
                      City
                    </label>
                    <Select
                      options={cities}
                      onChange={(option) => {
                        setFieldValue("city", option.value);
                      }}
                      placeholder="Select City"
                      isDisabled={!selectedState}
                      styles={{ input: (base) => ({ ...base, fontSize: "12px" }) }}
                    />
                    {errors.city && touched.city && (
                      <p style={{ color: "red" }}>{errors.city}</p>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="col-12 text-center mt-3">
                  <button className="btn btn-primary" type="submit">
                    Save Address
                  </button>
                </div>
              </div>
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default AddressformComp;
