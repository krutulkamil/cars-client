import React, {FunctionComponent, useEffect, useState} from "react";
import styled from "styled-components";
import tw from "twin.macro";
import Car from "../../components/car";
import {ICar} from "../../../typings/car";
import Carousel, {Dots, slidesToShowPlugin} from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import {useMediaQuery} from "react-responsive";
import {SCREENS} from "../../components/responsive";
import carService from "../../services/carService";
import {Dispatch} from "@reduxjs/toolkit";
import {GetCars_cars} from "../../services/carService/__generated__/GetCars";
import {setTopCars} from "./slice";
import {useDispatch} from "react-redux";

const TopCarsContainer = styled.div`
  ${tw`
        max-w-screen-lg
        w-full
        flex
        flex-col
        items-center
        justify-center
        pr-4
        pl-4
        md:pl-0
        md:pr-0
        mb-10
    `};
`;

const Title = styled.h2`
  ${tw`
        text-3xl
        lg:text-5xl
        text-black
        font-extrabold
    `};
`;

const CarsContainer = styled.div`
  ${tw`
        w-full
        flex
        flex-wrap
        justify-center
        mt-7
        md:mt-10
    `};
`;

const actionDispatch = (dispatch: Dispatch) => ({
    setTopCars: (cars: GetCars_cars[]) => dispatch(setTopCars(cars))
})

const TopCars: FunctionComponent = (): JSX.Element => {
    const [current, setCurrent] = useState<number>(0);

    const isMobile = useMediaQuery({ maxWidth: SCREENS.sm });

    const { setTopCars } = actionDispatch(useDispatch());

    const fetchTopCars = async () => {
        const cars = await carService.getCars().catch((err) => {
            console.log("Error:", err);
        });

        console.log("Cars ", cars);
        if (cars) {
            setTopCars(cars);
        }
    }

    const testCar1: ICar = {
        name: "Audi S3 Car",
        mileage: "10k",
        thumbnailScr: "https://cdn.jdpower.com/Models/640x480/2017-Audi-S3-PremiumPlus.jpg",
        dailyPrice: 70,
        monthlyPrice: 1600,
        gearType: "Auto",
        gas: "Petrol"
    }

    const testCar2: ICar = {
        name: "Honda City 5 Seater Car",
        mileage: "20k",
        thumbnailScr: "https://shinewiki.com/wp-content/uploads/2019/11/honda-city.jpg",
        dailyPrice: 50,
        monthlyPrice: 1500,
        gearType: "Auto",
        gas: "Petrol"
    };

    useEffect(() => {
        fetchTopCars();
    }, []);

    const cars = [(<Car {...testCar1} />), (<Car {...testCar2} />), (<Car {...testCar2} />), (
            <Car {...testCar1} />), (<Car {...testCar2} />), (<Car {...testCar1} />), (
            <Car {...testCar2} />)];

    const numberOfDots = isMobile ? cars.length : Math.ceil(cars.length / 3);

    return (
        <TopCarsContainer>
            <Title>Explore Our Top Deals</Title>
            <CarsContainer>
                <Carousel
                    value={current}
                    onChange={setCurrent}
                    slides={cars}
                    plugins={[
                        "clickToChange",
                        {
                            resolve: slidesToShowPlugin,
                            options: {
                                numberOfSlides: 3,
                            }
                        }
                    ]}
                    breakpoints={{
                        640: {
                            plugins: [
                                {
                                    resolve: slidesToShowPlugin,
                                    options: {
                                        numberOfSlides: 1,
                                    },
                                },
                            ],
                        },
                        900: {
                            plugins: [
                                {
                                    resolve: slidesToShowPlugin,
                                    options: {
                                        numberOfSlides: 2,
                                    },
                                },
                            ],
                        },
                    }}
                />
                <Dots value={current} onChange={setCurrent} number={numberOfDots} />
            </CarsContainer>
        </TopCarsContainer>
    );
};

export default TopCars;