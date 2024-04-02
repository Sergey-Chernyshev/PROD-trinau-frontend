import Joyride from "react-joyride";

export function Display_onboarding_if_needed({data}) {
    // let started = localStorage.getItem(
    //     "tour_started_" + data["tour_name"])
    // if (started) return null;
    for (let requirement of data.require_tours) {
        let passed = localStorage.getItem(
            "tour_passed_" + requirement)
        console.log(requirement, passed)
        if (passed === null) return null;
    }
    let passed = localStorage.getItem(
        "tour_passed_" + data["tour_name"])
    if (passed === null) {
        // localStorage.setItem(
        //     "tour_started_" + data["tour_name"], true)
        return (
            <Joyride {...data}


            />
        )
    }
    return null;
}