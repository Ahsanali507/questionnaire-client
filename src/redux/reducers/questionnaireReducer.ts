import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the initial state of the questionnaire
interface QuestionnaireState {
  email: string;
  status: 'new' | 'in-progress' | 'completed';
  step: number;
  responses: {
    step1: string | null;
    step2: {
      Comfort: number | null;
      Looks: number | null;
      Price: number | null;
    } | null;
  };
}

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

// Create the questionnaire slice with actions and reducers
const questionnaireSlice = createSlice({
  name: 'questionnaire',
  initialState,
  reducers: {
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
    setStatus(state, action: PayloadAction<'new' | 'in-progress' | 'completed'>) {
      state.status = action.payload;
    },
    setStep(state, action: PayloadAction<number>) {
      state.step = action.payload;
    },
    setResponse(
      state,
      action: PayloadAction<{ step: string; response: any }>
    ) {
      const { step, response } = action.payload;
      if (step === 'step1') {
        state.responses.step1 = response;
      } else if (step === 'step2') {
        state.responses.step2 = response;
      }
    },
  },
});

export const { setEmail, setStatus, setStep, setResponse } = questionnaireSlice.actions;

export default questionnaireSlice.reducer;
