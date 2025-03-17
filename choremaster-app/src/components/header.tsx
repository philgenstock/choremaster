import {HouseholdSelector} from "../features/household/HouseholdSelector";
import {AppBar, IconButton, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {CredentialResponse, GoogleLogin} from "@react-oauth/google";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {selectProfile, setTokenAndFetchProfile, userSlice} from "../features/user/userSlice";

export const Header = () => {

    const dispatch = useAppDispatch()
    const userProfile = useAppSelector(selectProfile)
    const onGoogleLogin = (message: CredentialResponse) => {
        if(message.credential) {
            dispatch(setTokenAndFetchProfile(message.credential))
        }
    }

    return <>
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Choremaster
                </Typography>
                {userProfile?
                    <>
                    {userProfile.name}
                    </>:
                    <GoogleLogin onSuccess={onGoogleLogin} useOneTap={true}></GoogleLogin>
                }

                <HouseholdSelector />

            </Toolbar>
        </AppBar>



    </>
}