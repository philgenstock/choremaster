import {HouseholdSelector} from "../features/household/HouseholdSelector";
import {AppBar, IconButton, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {CredentialResponse, GoogleLogin} from "@react-oauth/google";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {initializeUser, selectDisplayName, userSlice} from "../features/user/userSlice";

export const Header = () => {

    const dispatch = useAppDispatch()
    const displayName = useAppSelector(selectDisplayName)
    const onGoogleLogin = (message: CredentialResponse) => {
        if(message.credential) {
            initializeUser(message.credential, dispatch)
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
                {displayName?
                    <>
                    {displayName}
                    </>:
                    <GoogleLogin onSuccess={onGoogleLogin} useOneTap={true}></GoogleLogin>
                }

                <HouseholdSelector />

            </Toolbar>
        </AppBar>



    </>
}