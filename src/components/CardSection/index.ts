import { AddButton, AddButtonProps } from "./AddButton";
import { ClearAllButton, ClearAllButtonProps } from "./ClearAllButton";
import { Header, HeaderProps } from "./Header";
import { NewCardButton, NewCardButtonProps } from "./NewCardButton";
import { Title, TitleProps } from "./Title";

type CardSectionFamily = {
  AddButton: typeof AddButton;
  ClearAllButton: typeof ClearAllButton;
  Header: typeof Header;
  NewCardButton: typeof NewCardButton;
  Title: typeof Title;
};

export const CardSection: CardSectionFamily = {
  AddButton,
  ClearAllButton,
  Header,
  NewCardButton,
  Title,
};

export type {
  AddButtonProps,
  ClearAllButtonProps,
  HeaderProps,
  NewCardButtonProps,
  TitleProps,
};
