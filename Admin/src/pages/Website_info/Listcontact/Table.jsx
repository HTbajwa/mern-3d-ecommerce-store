import React, { useEffect, useState, useCallback } from "react";
import { BiEdit } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { AiOutlineDelete } from "react-icons/ai";
import Loadercomp from "../../../components/Loadercomp";
import { useDeleteContactMutation, useContactlistQuery } from "../../../store/api/webinfoapi";
import { BsQuestionLg } from "react-icons/bs";

const Table = () => {
  const [data, setData] = useState([]);
  const [isDelete, setIsDelete] = useState(null);

  const { data: userData, isLoading } = useContactlistQuery();
  const [deleteRecord] = useDeleteContactMutation();

  // Fetch user data
  useEffect(() => {
    if (userData?.data) {
      console.log("Fetched Data:", userData);
      const dataWithSerialNumbers = userData.data.map((row, index) => ({
        ...row,
        serialNo: index + 1,
        id: row._id || index + 1,
        fullname: `${row.firstname} ${row.lastname}`,
        formatdate: new Date(row.createdAt).toLocaleString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        })
      }));
      setData(dataWithSerialNumbers);
    }
    }, [userData]);
    

  // Delete user function
  const deleteUser = useCallback(async () => {
    if (!isDelete) return;
    try {
      await deleteRecord(isDelete);
      setData(prev => prev.filter(item => item._id !== isDelete));
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setIsDelete(null);
    }
  }, [isDelete, deleteRecord]);

  // Columns definition
  const columns = [
    { field: "serialNo", headerName: "S.No", headerAlign: "center", align: "center", flex: 0.3 },
    { field: "fullname", headerName: "Full Name", headerAlign: "center", align: "center", flex: 0.6 },
    { field: "email", headerName: "Email", headerAlign: "center", align: "center", flex: 1 },
    { field: "mobile", headerName: "Mobile No", headerAlign: "center", align: "center", flex: 1 },
    { field: "formatdate", headerName: "Created Date & Time", flex: 1 },
    {
      field: "_id",
      headerName: "Action",
      headerAlign: "center",
      align: "center",
      flex: 0.8,
      renderCell: ({ row }) => (
        <div>
          <NavLink to="#" onClick={() => setIsDelete(row._id)}>
            <AiOutlineDelete fontSize={23} color="#0C5398" style={{ paddingRight: "5px" }} />
          </NavLink>
          
        </div>
      )
    }
  ];

  return (
    <div className="row bg-white pb-4 rounded-bottom table-responsive" style={{ paddingBottom: "7rem" }}>
      {isLoading ? (
        <div style={{ textAlign: "center", fontWeight: "700" }}>
          <Loadercomp size={100} />
        </div>
      ) : (
        <DataGrid
          columns={columns}
          rows={data}
          density="compact"
          pageSizeOptions={[10, 20, 30, 50, 100]}
          components={{ Toolbar: GridToolbar }}
        />
      )}
      {isDelete && (
        <div className="modal fade show" style={{ display: "block" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <BsQuestionLg className="question-logo" />
              <div className="modal-header mod-line"></div>
              <div className="modal-body">
                <h1 className="ccedit-h">Warning</h1>
                <p className="ccedit-p">Do You Really Want to Delete This Record?</p>
              </div>
              <div className="modal-footer mod-line m-auto">
                <button type="button" className="btn closebtn text-white" onClick={deleteUser}>
                  Proceed
                </button>
                <button type="button" className="btn text-white" style={{ background: "grey" }} onClick={() => setIsDelete(null)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
