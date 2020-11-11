export const getHeader = async () => {
    let userData = await JSON.parse(localStorage.getItem('userData')) 
    if(userData)
    {
    return {
        headers: {
            token: "Bearer"+" "+ userData.token
        }
    }
}
}

export const addUserIdToData = async (data) => {
    let userData = await JSON.parse(localStorage.getItem('userData'))
    let newData = data
    newData.user_id = userData._id
    return newData 
}