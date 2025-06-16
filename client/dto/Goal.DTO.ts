import * as yup from 'yup';

export const GoalScema = yup.object().shape({
    target: yup.number().min(1).required('กรุณากรอก Target'),
    presents: yup.number().min(1).required('กรุณากรอก Presents'),
});

export type GoalProps = yup.InferType<typeof GoalScema>;

export const GoalDefaultValue: GoalProps = {
    target: 0,
    presents: 0,
};
