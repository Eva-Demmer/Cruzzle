import {
  Button,
  Divider,
  FormControlLabel,
  Switch,
  TextField,
} from "@mui/material";
import PropTypes from "prop-types";
import { Controller, useForm } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useState } from "react";
import Modal from "../modal/Modal";
import EditProfil1 from "../../assets/EditProfil1.svg";
import EditProfil2 from "../../assets/EditProfil2.svg";

export default function ModalEditProfil({ open, close }) {
  const { handleSubmit, control } = useForm();
  const [displayPhoneNumber, setDisplayPhoneNumber] = useState(false);
  const [displayBirthday, setDisplayBirthday] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const onSubmit = (data) => {
    console.info(data);
    close();
  };
  return (
    <Modal isOpen={open} onClose={close} onSave={handleSubmit(onSubmit)}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h4 className="text-black font-medium">
          Update your general information
        </h4>
        <Divider orientation="horizontal" />
        <div className="flex flex-col items-start justify-between border-none rounded-t">
          <div className="flex flex-col sm:gap-8 w-full sm:flex-row ">
            <div className="flex flex-col mb-5 sm:w-96 ">
              <h2 className="text-secondary-600 mb-8 ">Information</h2>
              <div className="pl-4 flex flex-col gap-3">
                <TextField
                  disabled
                  defaultValue="John"
                  label="First name"
                  variant="outlined"
                  className="mb-4 bg-black bg-opacity-5"
                />
                <TextField
                  disabled
                  defaultValue="Doe"
                  label="Last name"
                  variant="outlined"
                  className="mb-4  bg-black bg-opacity-5"
                />
                <TextField
                  disabled
                  defaultValue="john.doe@email.com"
                  label="Email"
                  variant="outlined"
                  className="mb-4  bg-black bg-opacity-5"
                />
                <Controller
                  name="phone"
                  control={control}
                  defaultValue=""
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      defaultValue={value}
                      placeholder="Phone"
                      InputLabelProps={{ shrink: true }}
                      label="Phone"
                      variant="outlined"
                      onChange={onChange}
                      inputProps={{ maxLength: 15 }}
                    />
                  )}
                />
                <FormControlLabel
                  control={
                    <Switch
                      color="primary"
                      checked={displayPhoneNumber}
                      onChange={(e) => setDisplayPhoneNumber(e.target.checked)}
                    />
                  }
                  label="Display phone number"
                  className="mb-4 ml-2"
                />
                <h4 className="text-secondary-600">Birthday</h4>
                <Controller
                  name="date"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      value={selectedDate}
                      label="Date"
                      format="MM/DD/YYYY"
                      clearable
                      disableFuture
                      InputLabelProps={{ shrink: true }}
                      onChange={(date) => {
                        setSelectedDate(
                          dayjs(date).format("YYYY-MM-DD HH:mm:ss")
                        );
                        field.onChange(date);
                      }}
                    />
                  )}
                />
                <FormControlLabel
                  control={
                    <Switch
                      color="primary"
                      checked={displayBirthday}
                      onChange={(e) => setDisplayBirthday(e.target.checked)}
                    />
                  }
                  label="Display birthday"
                  className="mb-4 ml-2"
                />
              </div>
            </div>
            <div className=" bg-black bg-opacity-5 sm:w-2/4 sm:h-1/5 w-64 rounded-3xl sm:mt-28 relative">
              <img
                className="absolute top-[-18px] sm:right-[-50px] w-52 right-[-60px]"
                alt="contact admin"
                src={EditProfil1}
              />
              <div className="flex flex-col w-72 gap-8 p-4">
                <p className="text-secondary-600 font-bold w-9/12 text-base">
                  Contact us if you made an error in the gray fields.
                </p>
                <Button variant="outlined" className="rounded-3xl w-32 h-auto">
                  <span className="font-bold items-center justify-center">
                    Contact
                  </span>
                </Button>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:gap-8 w-full sm:flex-row ">
            <div className="flex flex-col mb-5 sm:w-96">
              <h2 className="text-secondary-600 mb-4 ">General</h2>
              <div className="pl-4 flex flex-col gap-3">
                <Controller
                  name="About me"
                  control={control}
                  defaultValue=""
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      defaultValue={value}
                      onChange={onChange}
                      placeholder="Leave a few words..."
                      label="About me"
                      variant="outlined"
                      className="mb-4"
                      multiline
                      InputLabelProps={{ shrink: true }}
                      rows={8}
                      inputProps={{ maxLength: 255 }}
                    />
                  )}
                />
                <TextField
                  disabled
                  defaultValue="City"
                  label="City"
                  variant="outlined"
                  className="mb-4  bg-black bg-opacity-5"
                />
                <TextField
                  disabled
                  defaultValue="Country"
                  label="Country"
                  variant="outlined"
                  className="mb-4  bg-black bg-opacity-5"
                />
                <Controller
                  name="Link"
                  control={control}
                  defaultValue=""
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      defaultValue={value}
                      onChange={onChange}
                      placeholder="Link to share with collaborators"
                      InputLabelProps={{ shrink: true }}
                      label="Link"
                      variant="outlined"
                      className="mb-4"
                    />
                  )}
                />
              </div>
            </div>
            <div className="bg-black bg-opacity-5 sm:w-2/4 sm:h-1/5 w-64 rounded-3xl sm:mt-28 relative">
              <img
                className="absolute top-[-33px] sm:right-[-30px] w-48 right-[-70px]"
                alt="contact admin"
                src={EditProfil2}
              />
              <div className="flex flex-col w-72 gap-10 p-4 justify-center">
                <p className="text-secondary-600 font-bold w-8/12 text-base">
                  Leave a few words for your colleagues. It's always nice to get
                  to know the person a little.
                </p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
}
ModalEditProfil.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};
