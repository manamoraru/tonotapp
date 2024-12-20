export function useTelegramMock(): void {
  useClientOnce(() => {
    if (!sessionStorage.getItem('env-mocked') && isTMA('simple')) {
      return;
    }

    let lp: LaunchParams | undefined;
    try {
      lp = retrieveLaunchParams();
    } catch (e) {
      console.error('Error retrieving launch params:', e);
      try {
        const initDataRaw = new URLSearchParams([
          ['user', JSON.stringify({
            id: 99281932,
            first_name: 'Andrew',
            last_name: 'Rogue',
            username: 'rogue',
            language_code: 'en',
            is_premium: true,
            allows_write_to_pm: true,
          })],
          ['hash', '89d6079ad6762351f38c6dbbc41bb53048019256a9443988af7a48bcad16ba31'],
          ['auth_date', '1716922846'],
          ['start_param', 'debug'],
          ['chat_type', 'sender'],
          ['chat_instance', '8428209589180549439'],
        ]).toString();

        if (!initDataRaw || typeof initDataRaw !== 'string') {
          throw new Error('Invalid initDataRaw format');
        }

        lp = {
          themeParams: {
            accentTextColor: '#6ab2f2',
            bgColor: '#17212b',
            buttonColor: '#5288c1',
            buttonTextColor: '#ffffff',
            destructiveTextColor: '#ec3942',
            headerBgColor: '#17212b',
            hintColor: '#708499',
            linkColor: '#6ab3f3',
            secondaryBgColor: '#232e3c',
            sectionBgColor: '#17212b',
            sectionHeaderTextColor: '#6ab3f3',
            subtitleTextColor: '#708499',
            textColor: '#f5f5f5',
          },
          initData: parseInitData(initDataRaw),
          initDataRaw,
          version: '8',
          platform: 'tdesktop',
        };
      } catch (parseError) {
        console.error('Error parsing initDataRaw:', parseError);
        return; // Завершаем выполнение в случае ошибки
      }
    }

    sessionStorage.setItem('env-mocked', '1');
    try {
      mockTelegramEnv(lp);
      console.warn(
        '⚠️ Telegram environment was mocked for development. This is not recommended for production.',
      );
    } catch (mockError) {
      console.error('Error mocking Telegram environment:', mockError);
    }
  });
}
