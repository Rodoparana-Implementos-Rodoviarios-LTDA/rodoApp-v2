export function statusNewRequest(field: string, returnRequest: Record<string, any>): any {
    const newRequestFields = (statusDefine: string): any => {
      const listStatus = returnRequest;
      return listStatus[statusDefine];
    };
    return newRequestFields(field);
  }
  