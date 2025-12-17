import { StyleSheet, Platform } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useEffect } from 'react';

// SSR 예시 1: 메타데이터 설정
export default function SSRExample() {
  // 서버 사이드에서 실행되는 코드
  const serverData = {
    title: 'SSR Example Page',
    description: 'This is a server-side rendered page',
    timestamp: new Date().toISOString(),
  };

  // 웹에서만 메타데이터 설정 (SSR)
  useEffect(() => {
    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      document.title = serverData.title;
      // 메타 태그 동적 설정
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', serverData.description);
    }
  }, []);

  return (
    <>

      <ThemedView style={styles.container}>
        <ThemedText type="title">Server-Side Rendering Example</ThemedText>
        
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">서버에서 렌더링된 데이터:</ThemedText>
          <ThemedText>제목: {serverData.title}</ThemedText>
          <ThemedText>설명: {serverData.description}</ThemedText>
          <ThemedText>서버 시간: {serverData.timestamp}</ThemedText>
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">SSR의 장점:</ThemedText>
          <ThemedText>• SEO 최적화 (검색 엔진이 콘텐츠를 크롤링 가능)</ThemedText>
          <ThemedText>• 초기 로딩 성능 향상</ThemedText>
          <ThemedText>• 소셜 미디어 공유 시 미리보기 지원</ThemedText>
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

