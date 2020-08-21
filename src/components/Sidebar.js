import React from 'react'
import { SbHome } from './Sidebar/SBHome'
import { SbAdd } from './Sidebar/SBAdd'
import { SbSearch } from './Sidebar/SBSearch'
import { SbUser } from './Sidebar/SBUser'
import { SbInSection } from './Sidebar/SBInSection'

export const Sidebar = ({content}) => {

    switch (content) {
        case 1:
            return (
                <SbHome />
            )
        case 2:
            return (
                <SbAdd />
            )
        case 3:
            return (
                <SbSearch />
            )
        case 4:
            return (
                <SbUser />
            )
        case 5:
            return (
                <SbInSection />
            )

        default:
            return (
                <SbUser />
            )
    }
}