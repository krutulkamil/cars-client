import React, {FunctionComponent} from "react";
import styled from "styled-components";
import tw from "twin.macro";
import Navbar from "../../components/navbar";

const PageContainer = styled.div`
    ${tw`
        flex
        flex-col
        w-full
        h-full
        items-center
        overflow-x-hidden
    `}
`;

const HomePage: FunctionComponent = (): JSX.Element => {
    return (
        <PageContainer>
            <Navbar />
        </PageContainer>
    );
};

export default HomePage;