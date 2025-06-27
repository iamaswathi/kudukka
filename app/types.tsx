export type RootStackParamList = {
    Login: undefined;
    LoginOtp: { phone: string };
    PersonalInfo: { phone: string };
    Dashboard: { phone: string };
    HorizontalCalendar: { userId?: string }; // Optional `userId`
    Footer: undefined;
  };