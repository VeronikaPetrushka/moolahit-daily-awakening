import MDAroutewrapper from "../MDAhelpers/MDAroutewrapper";
import MDApartsimports from "./MDApartsimports";


export const MDAsplashroute = () => {
    return (
        <MDAroutewrapper mda={<MDApartsimports.MDAsplash />} mdaBack />
    )
};

export const MDAintroroute = () => {
    return (
        <MDAroutewrapper mda={<MDApartsimports.MDAintro />} mdaBack />
    )
};

export const MDAchallengeroute = () => {
    return (
        <MDAroutewrapper mda={<MDApartsimports.MDAchallenge />} MDA />
    )
};

export const MDAchallengeslogroute = () => {
    return (
        <MDAroutewrapper mda={<MDApartsimports.MDAchallengeslog />} MDA />
    )
};

export const MDAlevelsroute = () => {
    return (
        <MDAroutewrapper mda={<MDApartsimports.MDAlevels />} MDA />
    )
};