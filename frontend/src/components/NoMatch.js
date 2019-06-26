function NoMatch() {

    alert("URL Error\nClick OK to redirect")
    window.location.replace(process.env.REACT_APP_URL_BASE)

}

export default NoMatch