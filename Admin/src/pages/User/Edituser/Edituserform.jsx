import React from 'react'
import Loadercomp from "../../../components/Loadercomp";
import { Field, Form, Formik } from "formik";
import { Categoryvalidationedit } from "../Validation/Categoryvalidationedit";
import { useGetSingleUserQuery, usePatchUserMutation } from "../../../store/api/userapi";
import { useNavigate } from 'react-router-dom';
const Edituserform = ({id}) => {
    const nvg = useNavigate();
    const {data,isLoading} = useGetSingleUserQuery(id);



    // create category api start here
    const [patchuser, userresponse] = usePatchUserMutation();

    const UserForm = async (value) => {
      try {
        const response = await patchuser({ data: value, id: id });
        if (!response.error) {
          if (response.data.status == "successfully update") {
            nvg("/userlist/2");
            window.location.reload();
          }
        } else {
        //   setapiresponse(response.error.error);
        }
      } catch (error) {}
    };
    // create category api end here
  return (
    isLoading == true ? (
        <div className="container-fuild bg-white">
          {" "}
          <div
            className="col-12 d-flex justify-content-center"
            style={{ gap: "4px", position: "absolute", width: "100%" }}
          >
            <div className="px-2">
              {" "}
              <Loadercomp size={100} />
            </div>
          </div>
        </div>
      ) : (
        <div className="container-fuild pb-4 pt-3 px-2 bg-white">
   <Formik
  initialValues={{
    first_name: data?.data.first_name || '',
    last_name: data?.data.last_name || '',
    email: data?.data.email || '',
    mobile: data?.data.mobile || '',
    address: data?.data.address || '',
    country: data?.data.country || '',
    state: data?.data.state || '',
    city: data?.data.city || '',
    pincode: data?.data.pincode || '',
    status: data?.data.status || 'Active',
    type: data?.data.isAdmin || 'User',
  }}
  validationSchema={Categoryvalidationedit} // Ensure validation schema is included
  onSubmit={async (values) => {
    try {
      const response = await patchuser({ data: values, id });
      if (response?.data?.status === "successfully update") {
        nvg("/userlist/2");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating user:", error);
      // Optionally set error state to display the message to the user
    }
  }}
>
          
            {({
              values,
              errors,
              handleSubmit,
              touched,
              setFieldValue,
            }) => (
              <Form autoComplete="off" onSubmit={handleSubmit}>
                {console.log("wertyu", errors)}
                <div
                  className="row bg-white pb-4 round"
                  style={{
                    border: "1px solid #E0E0E0",
                    margin: "10px 0px",
                    borderRadius: "3px",
                    position: "relative",
                  }}
                >
                  <div className="col-md-6 px-2 pt-4">
                    <div className="row">
                      <div className="col-lg-4">
                        <label htmlFor="" className="form-label">
                          First Name{" "}
                          <span style={{ color: "red" }}>*</span>
                        </label>
                      </div>
                      <div className="col-lg-8">

                        <Field
                          type="text"
                          name="first_name"
                          className="form-control"
                          placeholder="First Name"
                          value={values.first_name}
                        />
                      </div>
                      <div className="offset-lg-4 col-lg-8">
                        {errors.first_name && touched.first_name ? (
                          <p style={{ color: "red" }}>
                            {errors.first_name}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 px-2 pt-4">
                    <div className="row">
                      <div className="col-lg-4">
                        <label htmlFor="" className="form-label">
                          Last Name <span style={{ color: "red" }}>*</span>
                        </label>
                      </div>
                      <div className="col-lg-8">
                        <Field
                          name="last_name"
                          type="text"
                          className="form-control"
                          placeholder="Last Name"
                          value={values.last_name}
                        />
                      </div>
                      <div className="offset-lg-4 col-lg-8">
                        {errors.last_name && touched.last_name ? (
                          <p style={{ color: "red" }}>
                            {errors.last_name}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6 px-2 pt-3">
                    <div className="row">
                      <div className="col-lg-4">
                        <label htmlFor="" className="form-label">
                          Email ID <span style={{ color: "red" }}>*</span>{" "}
                        </label>
                      </div>
                      <div className="col-lg-8">
                        <Field
                          name="email"
                          type="text"
                          className="form-control"
                          placeholder="Email ID"
                          value={values.email}
                        />
                      </div>
                      <div className="offset-lg-4 col-lg-8">
                        {errors.email && touched.email ? (
                          <p style={{ color: "red" }}>{errors.email}</p>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6 px-2 pt-3">
                    <div className="row">
                      <div className="col-lg-4">
                        <label htmlFor="" className="form-label">
                          Mobile .No{" "}
                          <span style={{ color: "red" }}>*</span>{" "}
                        </label>
                      </div>
                      <div className="col-lg-8">
                        <Field
                          name="mobile"
                          type="text"
                          className="form-control"
                          placeholder="Mobile. No"
                          value={values.mobile}
                        />
                      </div>
                      <div className="offset-lg-4 col-lg-8">
                        {errors.mobile && touched.mobile ? (
                          <p style={{ color: "red" }}>
                            {errors.mobile}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6 px-2 pt-3">
                    <div className="row">
                      <div className="col-lg-4">
                        <label htmlFor="" className="form-label ">
                          Address{" "}
                          <span style={{ color: "red" }}>*</span>{" "}
                        </label>
                      </div>
                      <div className="col-lg-8">
                        <Field
                          name="address"
                          type="text"
                          className="form-control"
                          placeholder="Address"
                          value={values.address}
                        />
                      </div>
                      <div className="offset-lg-4 col-lg-8">
                        {errors.address &&
                        touched.address ? (
                          <p style={{ color: "red" }}>
                            {errors.address}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 px-2 pt-3">
                    <div className="row">
                      <div className="col-lg-4">
                        <label htmlFor="" className="form-label ">
                          Country{" "}
                          <span style={{ color: "red" }}>*</span>{" "}
                        </label>
                      </div>
                      <div className="col-lg-8">
                        <Field
                          name="country"
                          type="text"
                          className="form-control"
                          placeholder="Country"
                          value={values.country}
                        />
                      </div>
                      <div className="offset-lg-4 col-lg-8">
                        {errors.country &&
                        touched.country ? (
                          <p style={{ color: "red" }}>
                            {errors.country}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 px-2 pt-3">
                    <div className="row">
                      <div className="col-lg-4">
                        <label htmlFor="" className="form-label ">
                          State{" "}
                          <span style={{ color: "red" }}>*</span>{" "}
                        </label>
                      </div>
                      <div className="col-lg-8">
                        <Field
                          name="state"
                          type="text"
                          className="form-control"
                          placeholder="State"
                          value={values.state}
                        />
                      </div>
                      <div className="offset-lg-4 col-lg-8">
                        {errors.state &&
                        touched.state ? (
                          <p style={{ color: "red" }}>
                            {errors.state}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 px-2 pt-3">
                    <div className="row">
                      <div className="col-lg-4">
                        <label htmlFor="" className="form-label ">
                          City{" "}
                          <span style={{ color: "red" }}>*</span>{" "}
                        </label>
                      </div>
                      <div className="col-lg-8">
                        <Field
                          name="city"
                          type="text"
                          className="form-control"
                          placeholder="City"
                          value={values.city}
                        />
                      </div>
                      <div className="offset-lg-4 col-lg-8">
                        {errors.city &&
                        touched.city ? (
                          <p style={{ color: "red" }}>
                            {errors.city}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 px-2 pt-3">
                    <div className="row">
                      <div className="col-lg-4">
                        <label htmlFor="" className="form-label ">
                          Pincode{" "}
                          <span style={{ color: "red" }}>*</span>{" "}
                        </label>
                      </div>
                      <div className="col-lg-8">
                        <Field
                          name="pincode"
                          type="text"
                          className="form-control"
                          placeholder="Pincode"
                          value={values.pincode}
                        />
                      </div>
                      <div className="offset-lg-4 col-lg-8">
                        {errors.pincode &&
                        touched.pincode ? (
                          <p style={{ color: "red" }}>
                            {errors.pincode}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 px-2 pt-3">
                    <div className="row">
                      <div className="col-lg-4">
                        <label htmlFor="" className="form-label">
                          User Status{" "}
                          <span style={{ color: "red" }}>*</span>
                        </label>
                      </div>
                      <div className="col-lg-8">
                        <Field
                          as="select"
                          name="status"
                          className="form-select"
                        >
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                        </Field>
                      </div>
                      <div className="offset-lg-4 col-lg-8">
                        {errors.status && touched.status ? (
                          <p style={{ color: "red" }}>{errors.status}</p>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 px-2 pt-3">
                    <div className="row">
                      <div className="col-lg-4">
                        <label htmlFor="" className="form-label">
                          Type{" "}
                          <span style={{ color: "red" }}>*</span>
                        </label>
                      </div>
                      <div className="col-lg-8">
                        <Field
                          as="select"
                          name="type"
                          className="form-select"
                        >
                          <option value="Admin">Admin</option>
                          <option value="User">User</option>
                        </Field>
                      </div>
                      <div className="offset-lg-4 col-lg-8">
                        {errors.type && touched.type ? (
                          <p style={{ color: "red" }}>{errors.type}</p>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  {/* <div className="col-md-12 px-2 pt-3">
                    <div className="row">
                      <div className="col-lg-2">
                        <label htmlFor="" className="form-label ">
                          Parent Category{" "}
                          <span style={{ color: "red" }}>*</span>{" "}
                        </label>
                      </div>
                      <div className="col-lg-10">
                        <Multiselect
                          isObject={false}
                          options={options}
                          onSelect={(selectedList) => {
                            setFieldValue("parent_category", selectedList);
                          }}
                          onRemove={(selectedList) => {
                            setFieldValue("parent_category", selectedList);
                          }}
                        />
                      </div>
                      <div className="offset-lg-2 col-lg-10">
                        {errors.parent_category && touched.parent_category ? (
                          <p style={{ color: "red" }}>
                            {errors.parent_category}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </div> */}

                  {/* <div className="col-12 pt-3">
                    <div className="row">
                      <div className="col-lg-12">
                        <label htmlFor="" className="form-label ">
                          Category Banner{" "}
                          <span style={{ color: "red" }}>*</span>{" "}
                        </label>
                      </div>
                      <div className="col-12">
                        <div className="border d-flex justify-content-center">
                          <button
                            type="button"
                            style={{ border: "none", outline: "none",width:renderbanner !== null ? '100%' : '' }}
                          >
                            <input
                              type="file"
                              name="category_image"
                              style={{ display: "none" }}
                              ref={imageInputRef}
                              accept="image/*"
                              s
                              onChange={(event) => {
                                setFieldValue(
                                  "category_image",
                                  event.currentTarget.files[0]
                                );
                              }}
                            />
                            <img
                              src={values.category_image == null ? img3 : URL.createObjectURL(values.category_image)}
                              alt="zxcvbnm"
                              width="100%"
                              height="200px"
                              onClick={()=>{imageInputRef.current.click()}}
                              style={{ cursor: "pointer" }}
                            />
                          </button>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        {errors.category_image && touched.category_image ? (
                          <p style={{ color: "red" }}>
                            {errors.category_image}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </div> */}

                  {/* <div className="col-12 px-2 pt-3">
                    <div className="row">
                      <div className="col-lg-12">
                        <label htmlFor="" className="form-label ">
                          Category Description{" "}
                          <span style={{ color: "red" }}>*</span>{" "}
                        </label>
                      </div>
                      <div className="col-lg-12">
                        <JoditEditor
                          config={config}
                          value={values.editor}
                          onChange={(content) =>
                            setFieldValue("editor", content)
                          }
                        />
                      </div>
                      <div className="col-lg-12">
                        {errors.editor && touched.editor ? (
                          <p style={{ color: "red" }}>{errors.editor}</p>
                        ) : null}
                      </div>
                    </div>
                  </div> */}

                  <div
                    className="col-12 py-5 px-4 d-flex justify-content-end"
                    style={{ gap: "4px" }}
                  >
                    <button className="btn4">Cancel</button>
                    
                    <button
                      type="submit"
                      className="btn5"
                      style={{ background: "#0e5da9" }}
                      disabled={userresponse.isLoading} 
                    >
                      Save
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )
  )
}

export default Edituserform