import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Platform } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

// SSR 예시 2: 동적 라우트에서 서버 사이드 데이터 페칭
export default function PostDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();

  // 실제로는 서버에서 데이터를 가져옵니다
  // 예: const post = await fetchPost(id);
  const post = {
    id: id || '1',
    title: `Post ${id || '1'}`,
    content: 'This is server-side rendered content for the post.',
    author: 'John Doe',
    date: new Date().toISOString(),
  };

  // 웹에서만 메타데이터 설정 (SSR)
  if (Platform.OS === 'web' && typeof document !== 'undefined') {
    document.title = `${post.title} - My Blog`;
    // 메타 태그 동적 설정
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', post.content.substring(0, 160));
    }
  }

  return (
    <>

      <ThemedView style={styles.container}>
        <ThemedText type="title">{post.title}</ThemedText>
        
        <ThemedView style={styles.meta}>
          <ThemedText>작성자: {post.author}</ThemedText>
          <ThemedText>날짜: {new Date(post.date).toLocaleDateString()}</ThemedText>
        </ThemedView>

        <ThemedView style={styles.content}>
          <ThemedText>{post.content}</ThemedText>
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
  meta: {
    marginTop: 10,
    marginBottom: 20,
    opacity: 0.7,
  },
  content: {
    marginTop: 20,
  },
});

