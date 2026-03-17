import { createContext, useContext, useState, ReactNode } from 'react';

export interface UserAccount {
  id: string;
  name: string;
  displayName: string;
  avatar: string;
  automationsCount: number;
  successRate: number;
}

const accounts: UserAccount[] = [
  {
    id: 'sandeep',
    name: 'Sandeep_m',
    displayName: 'Sandeep Majumder',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sandeep',
    automationsCount: 16,
    successRate: 94.3,
  },
  {
    id: 'ravi',
    name: 'Ravi_r',
    displayName: 'Ravi Ranjan',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ravi',
    automationsCount: 12,
    successRate: 91.7,
  },
  {
    id: 'sarthak',
    name: 'Sarthak_s',
    displayName: 'Sarthak Sharma',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarthak',
    automationsCount: 8,
    successRate: 96.2,
  },
];

interface AccountContextType {
  currentAccount: UserAccount;
  accounts: UserAccount[];
  switchAccount: (accountId: string) => void;
}

const AccountContext = createContext<AccountContextType | undefined>(undefined);

export function AccountProvider({ children }: { children: ReactNode }) {
  const [currentAccount, setCurrentAccount] = useState<UserAccount>(accounts[0]);

  const switchAccount = (accountId: string) => {
    const account = accounts.find(a => a.id === accountId);
    if (account) {
      setCurrentAccount(account);
    }
  };

  return (
    <AccountContext.Provider value={{ currentAccount, accounts, switchAccount }}>
      {children}
    </AccountContext.Provider>
  );
}

export function useAccount() {
  const context = useContext(AccountContext);
  if (context === undefined) {
    throw new Error('useAccount must be used within an AccountProvider');
  }
  return context;
}
