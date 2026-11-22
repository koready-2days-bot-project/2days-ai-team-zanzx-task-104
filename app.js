document.addEventListener('DOMContentLoaded', () => {
  let sampleAddresses = [
    {
      "address_id": "ADR-001",
      "road_address_en": "10, Donggyo-ro 51-gil, Mapo-gu, Seoul",
      "road_address_ko": "서울특별시 마포구 동교로51길 10",
      "building_name_en": "Hanbit Village Complex 2 Apt.",
      "building_name_ko": "한빛마을2단지아파트"
    },
    {
      "address_id": "ADR-002",
      "road_address_en": "25, World Cup buk-ro 4-gil, Mapo-gu, Seoul",
      "road_address_ko": "서울특별시 마포구 월드컵북로4길 25",
      "building_name_en": "Yeonnam Building",
      "building_name_ko": "연남빌딩"
    }
  ];

  fetch('data/B1_sample_addresses.json')
    .then(res => res.json())
    .then(data => {
      if (data && data.addresses) {
        sampleAddresses = data.addresses;
      }
    })
    .catch(() => console.log('Loaded embedded default sample addresses'));

  const presetTranslations = {
    "Leave at door and ring doorbell": "문 앞에 두고 벨을 눌러주세요",
    "Hand to me directly": "직접 전달해 주세요",
    "Leave with security guard": "경비실에 맡겨주세요"
  };

  let selectedAddress = null;

  const addressInput = document.getElementById('address-input');
  const searchBtn = document.getElementById('search-btn');
  const searchResults = document.getElementById('search-results');
  const searchError = document.getElementById('search-error');
  const searchEmpty = document.getElementById('search-empty');

  const stepSearch = document.getElementById('step-search');
  const stepDetails = document.getElementById('step-details');
  const stepCheckout = document.getElementById('step-checkout');
  const stepConfirmation = document.getElementById('step-confirmation');

  const selectedAddressEn = document.getElementById('selected-address-en');
  const selectedAddressKo = document.getElementById('selected-address-ko');
  const unitInput = document.getElementById('unit-input');
  const unitError = document.getElementById('unit-error');
  const detailsNextBtn = document.getElementById('details-next-btn');

  const checkoutAddressSummary = document.getElementById('checkout-address-summary');
  const presetRequestSelect = document.getElementById('preset-request-select');
  const customRequestInput = document.getElementById('custom-request-input');
  const placeOrderBtn = document.getElementById('place-order-btn');

  searchBtn.addEventListener('click', () => {
    const query = addressInput.value.trim().toLowerCase();
    searchResults.innerHTML = '';
    searchError.classList.add('hidden');
    searchEmpty.classList.add('hidden');

    if (query.length < 2) {
      searchError.classList.remove('hidden');
      return;
    }

    const matches = sampleAddresses.filter(a => 
      a.road_address_en.toLowerCase().includes(query) ||
      a.road_address_ko.includes(query) ||
      (a.building_name_en && a.building_name_en.toLowerCase().includes(query))
    );

    if (matches.length === 0) {
      searchEmpty.classList.remove('hidden');
      return;
    }

    matches.forEach(item => {
      const div = document.createElement('div');
      div.className = 'result-item';
      div.innerHTML = `
        <div class="card-title">${item.road_address_en}</div>
        <div class="card-sub">${item.road_address_ko}</div>
      `;
      div.addEventListener('click', () => selectAddress(item));
      searchResults.appendChild(div);
    });
  });

  function selectAddress(item) {
    selectedAddress = item;
    selectedAddressEn.textContent = item.road_address_en;
    selectedAddressKo.textContent = item.road_address_ko;
    stepSearch.classList.add('hidden');
    stepDetails.classList.remove('hidden');
  }

  detailsNextBtn.addEventListener('click', () => {
    const unit = unitInput.value.trim();
    if (!unit) {
      unitError.classList.remove('hidden');
      return;
    }
    unitError.classList.add('hidden');
    checkoutAddressSummary.textContent = `${selectedAddress.road_address_en}, ${unit}`;
    stepDetails.classList.add('hidden');
    stepCheckout.classList.remove('hidden');
  });

  presetRequestSelect.addEventListener('change', (e) => {
    if (e.target.value === 'custom') {
      customRequestInput.classList.remove('hidden');
    } else {
      customRequestInput.classList.add('hidden');
    }
  });

  placeOrderBtn.addEventListener('click', () => {
    const selectedOption = presetRequestSelect.value;
    let reqEn = selectedOption;
    let reqKo = presetTranslations[selectedOption] || null;

    if (selectedOption === 'custom') {
      reqEn = customRequestInput.value.trim() || 'Custom delivery request';
      reqKo = null;
    }

    const orderData = {
      address_id: selectedAddress.address_id,
      road_address_en: selectedAddress.road_address_en,
      road_address_ko: selectedAddress.road_address_ko,
      building_name_en: selectedAddress.building_name_en,
      building_name_ko: selectedAddress.building_name_ko,
      unit: unitInput.value.trim(),
      rider_request_en: reqEn,
      rider_request_ko: reqKo
    };

    localStorage.setItem('lieferoo_order', JSON.stringify(orderData));
    stepCheckout.classList.add('hidden');
    stepConfirmation.classList.remove('hidden');
  });
});