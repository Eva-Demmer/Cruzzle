import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  InputAdornment,
  TextField,
  IconButton,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Alert,
  AlertTitle,
} from "@mui/material";
import { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { UserContext } from "../contexts/UserContext";
import { LanguageContext } from "../contexts/LanguageContext";
import DialogPassword from "../components/settingspage/DialogPassword";
import { apiUsersVerifyPasword } from "../services/api.users";
import settingSvg from "../assets/settings.svg";

function Settings() {
  const { handleSubmit, control, reset } = useForm();
  const { user } = useContext(UserContext);
  const { language, setLanguage } = useContext(LanguageContext);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [openModifyPasswordDialog, setOpenModifyPasswordDialog] =
    useState(false);

  const onSubmit = async (data) => {
    const newData = {
      mail: data.username,
      password: data.password,
    };

    try {
      const response = await apiUsersVerifyPasword(newData);
      if (response.status === 200) {
        setPasswordError(false);
        reset();
        setOpenModifyPasswordDialog(true);
      } else {
        setPasswordError(true);
      }
    } catch (error) {
      setPasswordError(true);
    }
  };

  const languages = [
    {
      code: "GB",
      value: "EN",
      language: "English",
    },
    {
      code: "FR",
      value: "FR",
      language: "Français",
    },
  ];

  return (
    <div className="ideas-page w-full flex flex-col h-full">
      <header className="w-full px-6 min-[1439px]:w-8/12">
        <h2>Settings</h2>
      </header>
      <main className="px-6 flex flex-col">
        <div className="flex">
          <div className="w-full max-w-[600px]">
            <div className="flex flex-col" aria-label="language">
              <h3 className="py-6">Language</h3>
              <div className="flex flex-col md:w-full">
                <FormControl>
                  <InputLabel shrink>Select language</InputLabel>
                  <Select
                    id="languageSelect"
                    value={language}
                    input={<OutlinedInput notched label="Select language" />}
                    label="Age"
                    onChange={(e) => setLanguage(e.target.value)}
                  >
                    {languages.map((lang) => (
                      <MenuItem value={lang.value} key={lang.code}>
                        <span className="mr-2">
                          <img
                            loading="lazy"
                            width="20"
                            src={`https://flagcdn.com/w20/${lang.code.toLowerCase()}.png`}
                            srcSet={`https://flagcdn.com/w40/${lang.code.toLowerCase()}.png 2x`}
                            alt=""
                          />
                        </span>
                        {lang.language}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="flex flex-col" aria-label="password">
              <h3 className="py-6">Password</h3>
              <div className="flex flex-col ">
                <Alert severity="info" className="mb-6 md:w-full">
                  <AlertTitle>Info</AlertTitle>
                  You can <strong>change your password</strong> here. But you
                  need to identify yourself again before proceeding.
                </Alert>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="md:w-full flex flex-col"
                >
                  <Controller
                    name="username"
                    control={control}
                    defaultValue={user.mail}
                    render={({ field: { value } }) => (
                      <TextField
                        fullWidth
                        label="Email"
                        variant="outlined"
                        placeholder="Enter your username"
                        value={value}
                        disabled
                        InputLabelProps={{ shrink: true }}
                        sx={{
                          marginBottom: 4,
                        }}
                        autoComplete="your email"
                      />
                    )}
                  />

                  <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        id="password-input"
                        fullWidth
                        label="Password"
                        variant="outlined"
                        placeholder="Enter your password"
                        error={passwordError}
                        helperText={passwordError ? "Incorrect entry." : " "} // Ajoutez un espace vide pour maintenir l'espace réservé
                        value={value}
                        onChange={onChange}
                        type={showPassword ? "text" : "password"}
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        autoComplete="new-password"
                      />
                    )}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    size="large"
                    className="flex rounded-full mx-2 min-w-[122px] my-2 self-center sm:self-end"
                    sx={{
                      boxShadow: 1,
                      "&:hover": { boxShadow: 2 },
                      "&:active, &.Mui-focusVisible": { boxShadow: 4 },
                    }}
                  >
                    Confirm
                  </Button>
                </form>
              </div>
              {openModifyPasswordDialog && (
                <DialogPassword
                  open={openModifyPasswordDialog}
                  onClose={() => setOpenModifyPasswordDialog(false)}
                />
              )}
            </div>
          </div>
          <div className="hidden lg:flex lg:justify-center w-full mx-4 ">
            <img
              src={settingSvg}
              alt="settings"
              className="lg:w-4/5 max-w-[500px]"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
export default Settings;
