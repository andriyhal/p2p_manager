import React from 'react';
import {useForm} from 'react-hook-form';
import {styled} from "@mui/system";
import {Button} from "@mui/material";

import {FormInputDropdown} from "./dropdown";
import {FormInputText} from "./input";

const FIAT_OPTIONS = [
    {
        label: "UAH",
        value: "uah",
    }
];

const TRADE_TYPES_OPTIONS = [
    {
        label: "Sell",
        value: "sell",
    },
    {
        label: "Buy",
        value: "buy",
    }
];

const ASSET_OPTIONS = [
    {
        label: "USDT",
        value: "usdt",
    },
    {
        label: "BUSD",
        value: "busd",
    },
    {
        label: "BNB",
        value: "bnb",
    },
    {
        label: "ETH",
        value: "eth",
    }
];

const DEFAULT_VALUES = {
    nickName: "",
    fiat: "uah",
    asset: "usdt",
    tradeType: "sell",
};

const FormContainer = styled("form")({
    display: "flex",
    gap: "15px"
})

const ButtonContainer = styled(Button)({
    minWidth: "120px"
})

export const P2PTrackerForm = ({onAddTask}) => {
    const {
        control,
        handleSubmit,
        reset,
    } = useForm({defaultValues: DEFAULT_VALUES});

    const onSubmit = (data) => {
        onAddTask(data);
        reset();
    };

    return (
        <div className="modal_content">
            <h2>Добавить обновление ордера</h2>
            <FormContainer onSubmit={handleSubmit(onSubmit)}>
                <FormInputText
                    label="Nickname: "
                    name="nickName"
                    control={control}
                />
                <FormInputDropdown
                    name={"fiat"}
                    control={control}
                    label={"Fiat: "}
                    options={FIAT_OPTIONS}
                />
                <FormInputDropdown
                    name={"asset"}
                    control={control}
                    label={"Asset: "}
                    options={ASSET_OPTIONS}
                />
                <FormInputDropdown
                    name={"tradeType"}
                    control={control}
                    label={"Trade type: "}
                    options={TRADE_TYPES_OPTIONS}
                />
                <ButtonContainer variant="contained" type="submit">Добавить</ButtonContainer>
            </FormContainer>
        </div>
    );
};
