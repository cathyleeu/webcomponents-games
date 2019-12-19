module.exports = function(classObj) {
  var schoolCode = classObj.code.split("-").slice(0, 2).join("-"),
      classCode = classObj.code,
      book = [9, 10];

  // 수원 참사랑어린이집, 꽃내음어린이집 늑대와여우 태블릿(IE) 용량 문제로 본 진도 한권씩만
  if(schoolCode == "A00059-K1" || schoolCode == "A00059-K2") {
    book = [9];
  }
  // 수원 은솔어린이집 특별상 생략
  if(schoolCode == "A00059-K8") {
    book = [10, 10.5];
  }
  // 대구 햇살어린이집 방학권 미사용
  if(schoolCode == "C00071-K13") {
    book = [10, 10.5];
  }
  // 인천 동심유치원 10월 6호 오픈 요청
  if(schoolCode == "C00194-K4") {
    book = [8, 9];
  }
  // 부산 키즈클럽 롯데어학원 19년2월까지 9권 요청
  if(schoolCode == "A00066-K1") {
    book = [7, 8];
  }
  // 초록나라 영재유치원 8월말 3호 오픈 요청
  if(schoolCode == "C00175-K4") {
    book = [6, 7];
  }
  // 초록나라 예원유치원 9월말 6호 오픈 요청
  if(schoolCode == "C00175-K1") {
    book = [8, 9];
  }
  // 엠에스에듀 안산지사, 경서유치원 8월말 4호 오픈 요청
  if(schoolCode == "C00188-K2" || schoolCode == "C00188-K4") {
    book = [6, 7];
  }
  // 양주 ECC 
  if(schoolCode == "B00171-K1") {
    book = [10, 10.5];
  }
  // 제천지사 창의놀이유치원 
  if(schoolCode == "C00204-K2") {
    book = [10, 10.5];
  }
  // 인천지사 참조은 유치원 8월에 2권 요청함
  if(schoolCode == "C00194-K1") {
    book = [5, 5.5];
  }
  // 동대문ECC 19년 6월에 1권 요청함
  if(schoolCode == "B00286-K1") {
    book = [6, 7];
  }
  // 청라ECC, 광명ECC, 마포서대문ECC 2학기 신규 1권
  if(schoolCode == "B00016-K1" || schoolCode == "B00022-K1" || schoolCode == "B00243-K1") {
    book = [4, 5, 9, 10];
  }
  // 동탄1ECC 10월 신규 1권
  if(schoolCode == "B00240-K1") {
    book = [3, 4, 9, 10];
  }
  // 설리번 11월 3주 7권 요청
  if(schoolCode == "E00250-K1") {
    book = [8, 9, 10];
  }
  // 오산라이즈어학원 12월 1권 요청
  if(schoolCode == "A00059-K12") {
    book = [1, 2];
  }
  // YBM영업부(내부용)
  if(schoolCode == "A00083-K3") {
    book = [1, 2, 3, 4, 5, 5.5, 6, 7, 8, 9, 10, 10.5];
  }
  // 영문전차시(내부용)
  if(schoolCode == "B00055-K1") {
    book = [1, 2, 3, 4, 5, 5.5, 6, 7, 8, 9, 10, 10.5];
  }
  // 영문데모(1,5권)
  if(schoolCode == "A00083-K15") {
    book = [1, 5];
  }
  // 설명회용 7세 샘플(인천지사 요청)
  if(schoolCode == "C00224-K67") {
    book = [5, 7, 9];
  }
  // 영업용 6세 샘플(수원지사 요청)
  if(schoolCode == "C00224-K68") {
    book = [5.5];
  }
  // 영업용(시범교육 1,3,5권)
  if(schoolCode == "A00083-K5") {
    book = [1, 3, 5];
  }
  // 개발용(2017전권+2018리뉴얼)
  if(schoolCode == "A00083-K6") {
    book = [1, 2, 3, 4, 5, 5.5, 6, 7, 8, 9, 10, 10.5];
  }
  // 영업용(시범교육 영문 1,3,5권)
  if(schoolCode == "A00083-K7") {
    book = [1, 3, 5];
  }

  book = book.map(function(num) {
    var bookCode = {
      "1": "1-re",
      "2": "2-re",
      "3": "3-re",
      "4": "4-re",
      "5": "5-re",
      "5.5": "5-5-re",
      "6": "6",
      "7": "7",
      "8": "8",
      "9": "9",
      "10": "10",
      "10.5": "10-5",
    }[String(num)] || num;
    return classObj.level + "-" + bookCode;
  }).join(",");
  // 숙명키즈 파랑반(8세) 시범용 컨텐츠
  if(classCode == "A00083-K4-KC10") {
    book = "A-Test,B-Test,C-Test";
  }
  // 대구지사 소속원, 이유경 테스트 계정에 테스트 컨텐츠 추가
  if(schoolCode.slice(0,6) == "C00071" || schoolCode.slice(0,6) == "C00176") {
    book += "," + classObj.level + "-Test";
  }
  // 잉글루 본사 제공용
  if(schoolCode == "A00083-K11") {
    book = "CHO-A-1,CHO-A-2";
  }
    // 키즈코딩 테스트 0917
  if(schoolCode == "A00083-K12") {
    book = "CHO-A-1,CHO-A-2,CHO-A-3,CHO-A-4,CHO-A-5,CHO-A-6,CHO-A-7,CHO-A-8,CHO-A-9,CHO-A-10,CHO-A-11,CHO-A-12";
  }
  return book;
}
