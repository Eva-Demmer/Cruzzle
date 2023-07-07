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
import { useContext, useState } from "react";
import Modal from "../modal/Modal";
import EditProfil1 from "../../assets/EditProfil1.svg";
import EditProfil2 from "../../assets/EditProfil2.svg";
import { apiUpdateUser, apiUserById } from "../../services/api.users";
import { UserProfileContext } from "../../contexts/UserProfile";

export default function ModalEditProfil({ open, close }) {
  const { handleSubmit, control } = useForm();
  const { user, setUser } = useContext(UserProfileContext);
  const [sharePhone, setSharePhone] = useState(user.share_phone);
  const [displayBirthday, setDisplayBirthday] = useState(user.share_birthdate);
  const [selectedDate, setSelectedDate] = useState(null);
  const {
    firstname,
    lastname,
    biography,
    mail,
    phone,
    agency: { city, country },
    link,
  } = user;
  const onSubmit = async (data) => {
    const updatedData = {
      ...data,
      share_phone: sharePhone,
      share_birthdate: displayBirthday,
    };
    console.info(updatedData);

    const response = await apiUpdateUser(user.id, updatedData);
    if (response) {
      try {
        const result = await apiUserById(user.id);
        if (result) {
          setUser(result.data);
        } else {
          console.error("Failed to fetch user data");
        }
        close();
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    } else {
      console.error("Failed to update user");
    }
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
                  defaultValue={firstname}
                  label="First name"
                  variant="outlined"
                  className="mb-4 bg-black bg-opacity-5"
                />
                <TextField
                  disabled
                  defaultValue={lastname}
                  label="Last name"
                  variant="outlined"
                  className="mb-4  bg-black bg-opacity-5"
                />
                <TextField
                  disabled
                  defaultValue={mail}
                  label="Email"
                  variant="outlined"
                  className="mb-4  bg-black bg-opacity-5"
                />
                <Controller
                  name="phone"
                  control={control}
                  defaultValue={phone}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      value={value}
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
                      checked={sharePhone}
                      onChange={(e) => setSharePhone(e.target.checked)}
                    />
                  }
                  label="Display phone number"
                  className="mb-4 ml-2"
                />
                <h4 className="text-secondary-600">Birthday</h4>
                <Controller
                  name="birthdate"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      value={selectedDate}
                      label="Date"
                      format="YYYY-MM-DD"
                      clearable
                      disableFuture
                      InputLabelProps={{ shrink: true }}
                      onChange={(date) => {
                        setSelectedDate(
                          dayjs(date).locale("fr").format("YYYY-MM-DD")
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
                  name="biography"
                  control={control}
                  defaultValue={biography}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      value={value}
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
                  defaultValue={city}
                  label="City"
                  variant="outlined"
                  className="mb-4  bg-black bg-opacity-5"
                />
                <TextField
                  disabled
                  defaultValue={country}
                  label="Country"
                  variant="outlined"
                  className="mb-4  bg-black bg-opacity-5"
                />
                <Controller
                  name="link"
                  control={control}
                  defaultValue={link}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      value={value}
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
