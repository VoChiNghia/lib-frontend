import { Category } from "../../type/index";

interface LoadingType {
  loading: boolean;
}

export interface initalStateCategory extends LoadingType {
  category: Category[];
}


