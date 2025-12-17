import { StyleSheet, Platform } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useEffect, useState } from 'react';

// SSR 예시 3: 서버 사이드와 클라이언트 사이드 데이터 페칭 조합
export default function APIExample() {
  const [clientData, setClientData] = useState<string | null>(null);

  // 서버 사이드에서 실행되는 초기 데이터
  const serverData = {
    message: 'This data was rendered on the server',
    timestamp: new Date().toISOString(),
  };

  // 웹에서만 메타데이터 설정 (SSR)
  useEffect(() => {
    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      document.title = 'API Example - SSR & CSR';
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', 'Example of server-side and client-side rendering');
    }
  }, []);

  // 클라이언트 사이드에서 실행되는 데이터 페칭
  useEffect(() => {
    if (Platform.OS === 'web') {
      // 웹에서만 실행되는 클라이언트 사이드 코드
      fetch('/api/data')
        .then((res) => res.json())
        .then((data) => setClientData(data.message))
        .catch(() => setClientData('Failed to fetch client data'));
    }
  }, []);

  return (
    <>

      <ThemedView style={styles.container}>
        <ThemedText type="title">Server & Client Side Rendering</ThemedText>

        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">서버 사이드 데이터 (SSR):</ThemedText>
          <ThemedText>{serverData.message}</ThemedText>
          <ThemedText>시간: {serverData.timestamp}</ThemedText>
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">클라이언트 사이드 데이터 (CSR):</ThemedText>
          <ThemedText>
            {clientData ? clientData : 'Loading client data...'}
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">SSR + CSR 조합:</ThemedText>
          <ThemedText>• 초기 콘텐츠는 서버에서 렌더링 (빠른 첫 로딩)</ThemedText>
          <ThemedText>• 동적 데이터는 클라이언트에서 페칭 (인터랙티브)</ThemedText>
          <ThemedText>• SEO는 서버 데이터로 최적화</ThemedText>
        </ThemedView>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginTop: 20,
    gap: 8,
  },
});

