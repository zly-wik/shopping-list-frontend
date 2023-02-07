import { Label } from "reactstrap";

function Profile({ isLoggedIn }) {
    const renderProfile = () => {
        if (isLoggedIn) {
            return (
                <div>
                    <h3>User Name</h3>
                    <Label for="profile-lvl">Profile:&nbsp;</Label>
                    <select name="profile-lvl" id="profile-lvl">
                        <option value="STD">Standard</option>
                        <option value="VIP">Premium</option>
                    </select>
                    <br />
                </div>
            );
        } else {
            return <div>You are not logged in</div>;
        }
    };

    return renderProfile();
}

export default Profile;
