/* eslint-disable camelcase */
import React, { useContext, useState } from "react";
import {
  MapPinIcon,
  LinkIcon,
  PencilSquareIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/outline";
import {
  Button,
  TextField,
  Switch,
  FormControlLabel,
  Divider,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { sm } from "../../utils/mediaQueries";
import ModifierButton from "./ModifierButton";
import AvatarUserProfile from "../avatar/AvatarUserProfile";
import { UserContext } from "../../contexts/UserContext";
import EditProfil1 from "../../assets/EditProfil1.svg";
import EditProfil2 from "../../assets/EditProfil2.svg";
import Modal from "../modal/Modal";

function TopSectionProfil() {
  const { banner_url, firstname, lastname, agency_id, position_id, id, link } =
    useContext(UserContext);
  const userId = useParams();
  const isCurrentUserProfile = parseInt(userId.id, 10) === parseInt(id, 10);
  const smallQuery = useMediaQuery(sm);
  const [open, setOpen] = useState(false);
  const { handleSubmit, control } = useForm();
  const [displayPhoneNumber, setDisplayPhoneNumber] = useState(false);
  const [displayBirthday, setDisplayBirthday] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const onSubmit = (data) => {
    console.info(data);
    handleCloseModal();
  };
  return (
    <div className="flex flex-col flex-start">
      <div className="relative mb-16">
        <div className="absolute ml-6 bottom-[-48px]">
          <div className="relative ">
            <AvatarUserProfile />
            {isCurrentUserProfile && (
              <div className="absolute left-16 bottom-[-4px]">
                <ModifierButton />
              </div>
            )}
          </div>
        </div>
        {isCurrentUserProfile && (
          <div className="absolute right-7 bottom-[+20px] md:bottom-[+20px] md:right-5">
            <ModifierButton />
          </div>
        )}
        {isCurrentUserProfile && smallQuery && (
          <Button
            variant="outlined"
            className="absolute rounded-3xl w-32 h-11 right-5 bottom-[-50px]"
            onClick={handleOpenModal}
          >
            <span className="flex gap-2 text-primary-900">
              <PencilSquareIcon className="h-6 w-6" />
              <span className="font-bold">MODIFY</span>
            </span>
          </Button>
        )}
        <div
          className="w-full h-64 bg-cover bg-center"
          style={{
            backgroundImage: `url(${banner_url})`,
          }}
        />
      </div>
      <div className="flex w-full justify-between items-center mb-4 md:mb-1">
        <h2 className="ml-5 font-regular text-2xl text-black">
          {firstname} {lastname}
        </h2>
        {isCurrentUserProfile && !smallQuery && (
          <Button
            variant="outlined"
            className="rounded-3xl w-32 h-11 mr-7"
            onClick={handleOpenModal}
          >
            <span className="flex gap-2 text-primary-900">
              <PencilSquareIcon className="h-6 w-6" />
              <span className="font-bold">MODIFY</span>
            </span>
          </Button>
        )}
      </div>
      <div className="flex flex-col gap-2 ml-5 lg:flex-row lg:gap-12">
        <div className="flex gap-1 justify-start items-center">
          <BriefcaseIcon className="h-6 w-6 text-secondary-600" />
          <p className="font-medium text-secondary-600">{position_id}</p>
        </div>
        <div className="flex justify-start items-center">
          <MapPinIcon className="h-6 w-6 text-secondary-600" />
          <p className="ml-1 font-medium text-secondary-600">{agency_id}</p>
        </div>
        <div className="flex justify-start items-center">
          <LinkIcon className="h-6 w-6 text-secondary-600" />
          <p className="ml-1 font-medium">
            <a
              href={link}
              className="text-bg-primary-900"
              target="_blank"
              rel="noreferrer"
            >
              {link}
            </a>
          </p>
        </div>
      </div>
      {open && (
        <Modal
          isOpen={open}
          onClose={handleCloseModal}
          onSave={handleSubmit(onSubmit)}
        >
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
                          onChange={(e) =>
                            setDisplayPhoneNumber(e.target.checked)
                          }
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
                            setSelectedDate(date);
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
                    <Button
                      variant="outlined"
                      className="rounded-3xl w-32 h-auto"
                    >
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
                      Leave a few words for your colleagues. It's always nice to
                      get to know the person a little.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

export default TopSectionProfil;
