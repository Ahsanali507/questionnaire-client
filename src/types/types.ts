export interface QuestionnaireState {
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
  
  export interface RootState {
    questionnaire: QuestionnaireState;
  }