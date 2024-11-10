import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QuestionnaireState } from '../../types/types';

const initialState: QuestionnaireState = {
  email: '',
  status: 'new',
  step: 1,
  responses: {
    step1: null,
    step2: {
      Comfort: null,
      Looks: null,
      Price: null,
    },
  },
};

const questionnaireSlice = createSlice({
  name: 'questionnaire',
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setStatus: (state, action: PayloadAction<'new' | 'in-progress' | 'completed'>) => {
      state.status = action.payload;
    },
    setStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
    },
    setResponse: (
      state,
      action: PayloadAction<{ 
        step: 'step1' | 'step2'; 
        response: string | { Comfort: number; Looks: number; Price: number } 
      }>
    ) => {
      const { step, response } = action.payload;
      if (step === 'step1') {
        state.responses.step1 = response as string;
      } else if (step === 'step2') {
        state.responses.step2 = response as { Comfort: number; Looks: number; Price: number };
      }
    },
    resetResponses: (state) => {
      state.responses = {
        step1: null,
        step2: {
          Comfort: null,
          Looks: null,
          Price: null,
        },
      };
    },
  },
});

export const { setEmail, setStatus, setStep, setResponse, resetResponses } = questionnaireSlice.actions;

export default questionnaireSlice.reducer;
