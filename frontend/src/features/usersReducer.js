export function saveUser(username, password){
    return async function saveUserThunk(dispatch) {
        try {
            fetch('http://localhost:3000/api/v1/users/login',{
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'accepts': 'application/json'
                },
                body: JSON.stringify(
                    { user: 
                        {
                            username:username, 
                            password:password
                        }
                    }
                )
            })
            .then (resp => resp.json())
            .then (data => {
                localStorage.setItem('token', data.jwt)
                dispatch(
                    {
                        type:'user/saveUser',
                        payload: data.user
                    }
                    // load user into state
                )
            })
        } catch (error) {
            console.log(error)
            dispatch(
                {
                        type:'user/error',
                        payload: error
                    }
            )
        }
    }
}

export default usersReducer